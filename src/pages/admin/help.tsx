import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import TitleText from "@/components/TitleText";
import { RESPONSIVE_GAP } from "@/config";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const rows = [
  { label: "{{text}}", value: "Underline" },
  { label: "[[text]]", value: "Primary Color" },
];

const Help: NextPageWithLayout = () => (
  <Page title="Help">
    <HeaderBreadcrumbs
      heading="Help"
      links={[{ name: "Help" }]}
    />

    <Stack spacing={RESPONSIVE_GAP}>
      <Card>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ boxShadow: "none !important" }}>
                  Text Format
                </TableCell>
                <TableCell sx={{ boxShadow: "none !important" }}>
                  Output
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.label}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.label}</TableCell>
                  <TableCell>
                    <TitleText text={row.label} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Card>
        <CardHeader title="Report a bug or request a new feature" />
        <Divider />
        <CardContent>
          <Typography variant="body1">
            If you find any bug or need modification please contact us at{" "}
            <Link
              href="https://jamsrworld.com/contact/"
              target="_blank"
            >
              jamsrworld.com
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  </Page>
);
Help.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Help;
