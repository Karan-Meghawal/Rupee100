import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { prismaJsonToRecord } from "@/server/utils/fns";
import { mongo } from "@/server/utils/mongo";
import { type Transaction_Category, type User } from "@prisma/client";
import { type ReportSchema } from "../schema";

const topEarners = async ({
  input,
}: {
  ctx: AdminContext;
  input: ReportSchema["topEarners"];
}) => {
  const {
    paginationModel: { page, pageSize },
    sortModel,
    searchFilter,
  } = input;

  let sortField: string | null = null;
  let sortOrder: 1 | -1 = 1;

  if (sortModel.length && sortModel[0]) {
    const { field, sort } = sortModel[0]!;
    if (sort) {
      sortField = field;
      sortOrder = sort === "asc" ? 1 : -1;
    }
  }

  const earning: Transaction_Category[] = ["referralIncome", "roi"];

  const data = await prisma.user.aggregateRaw({
    pipeline: [
      {
        $lookup: {
          from: "Transaction",
          localField: "userId",
          foreignField: "userId",
          as: "transactions",
        },
      },
      {
        $unwind: {
          path: "$transactions",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          earning: { $sum: "$transactions.netAmount" },
        },
      },
      {
        $match: {
          "transactions.category": { $in: earning },
          earning: { $gt: 0 },
          ...(searchFilter && {
            $or: [
              mongo.searchDate("$createdAt", searchFilter),
              mongo.searchStr("displayName", searchFilter),
              mongo.searchNonStr("$userId", searchFilter),
              mongo.searchNonStr("$earning", searchFilter),
              mongo.searchStr("status", searchFilter),
              mongo.searchStr("email", searchFilter),
              mongo.searchStr("userName", searchFilter),
            ],
          }),
        },
      },
      {
        $group: {
          _id: "$userId",
          id: { $first: "$userId" },
          userId: { $first: "$userId" },
          avatar: { $first: "$avatar" },
          createdAt: {
            $first: {
              $dateToString: {
                format: "%Y-%m-%dT%H:%M:%S.%LZ",
                date: "$createdAt",
              },
            },
          },
          email: { $first: "$email" },
          userName: { $first: "$userName" },
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          earning: {
            $sum: "$earning",
          },
        },
      },
      {
        $facet: {
          rows: [
            ...(sortField
              ? [
                  {
                    $sort: {
                      [sortField]: sortOrder,
                    },
                  },
                ]
              : []),
            {
              $skip: page * pageSize,
            },
            {
              $limit: pageSize,
            },
          ],
          count: [
            {
              $count: "rowCount",
            },
          ],
        },
      },
    ],
  });

  type Result = Pick<
    User,
    | "avatar"
    | "email"
    | "firstName"
    | "lastName"
    | "userName"
    | "userId"
    | "createdAt"
  > & {
    earning: number;
  };

  const result = prismaJsonToRecord(data[0]!);
  const rows = result?.rows as unknown as Result[];

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const rowCount = (result?.count?.[0]?.rowCount ?? 0) as number;

  return { rowCount, rows };
};
export default topEarners;
