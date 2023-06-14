import { prisma } from "@/server/db";
import { type AdminContext } from "@/server/trpc";
import { prismaJsonToRecord } from "@/server/utils/fns";
import { mongo } from "@/server/utils/mongo";
import { type User } from "@prisma/client";
import { type ReportSchema } from "../schema";

const topSponsors = async ({
  input,
}: {
  ctx: AdminContext;
  input: ReportSchema["topSponsors"];
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

  const data = await prisma.user.aggregateRaw({
    pipeline: [
      {
        $lookup: {
          from: "ReferralIncome",
          localField: "userId",
          foreignField: "referralId",
          as: "referral",
        },
      },
      {
        $addFields: {
          referrals: { $size: "$referral" },
        },
      },
      {
        $match: {
          referrals: { $gt: 0 },
          ...(searchFilter && {
            $or: [
              mongo.searchDate("$createdAt", searchFilter),
              mongo.searchStr("displayName", searchFilter),
              mongo.searchNonStr("$userId", searchFilter),
              mongo.searchNonStr("$referrals", searchFilter),
              mongo.searchStr("status", searchFilter),
              mongo.searchStr("email", searchFilter),
              mongo.searchStr("userName", searchFilter),
            ],
          }),
        },
      },
      {
        $project: {
          id: "$_id",
          avatar: 1,
          createdAt: {
            $dateToString: {
              format: "%Y-%m-%dT%H:%M:%S.%LZ",
              date: "$createdAt",
            },
          },
          email: 1,
          userId: 1,
          userName: 1,
          firstName: 1,
          lastName: 1,
          referrals: 1,
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
    | "id"
    | "avatar"
    | "email"
    | "firstName"
    | "lastName"
    | "userName"
    | "userId"
    | "createdAt"
  > & {
    referrals: number;
  };
  const result = prismaJsonToRecord(data[0]!);
  const rows = result?.rows as unknown as Result[];

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const rowCount = (result?.count?.[0]?.rowCount ?? 0) as number;

  return { rows, rowCount };
};
export default topSponsors;
