import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { FaqAction, FaqCreateDialog } from "@/sections/admin/faq";
import { adminApi } from "@/utils/api";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Faq: NextPageWithLayout = () => {
  const { data, isLoading } = adminApi.faq.records.useQuery();
  const faqs = data ?? [];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Page title="Faqs">
      <HeaderBreadcrumbs
        heading="Faqs"
        links={[{ name: "Pages" }, { name: "Faqs" }]}
      />

      <Box>
        {isLoading && <LinearProgress />}
        <Stack
          spacing={4}
          alignItems="flex-end"
        >
          <Button
            onClick={handleOpen}
            color="primary"
          >
            <Iconify
              sx={{ fontSize: 24, marginLeft: "auto" }}
              icon="carbon:add"
            />{" "}
            Create New
          </Button>
          <Stack
            spacing={2}
            sx={{ width: 1 }}
          >
            {faqs.map(({ question, answer, id }, index) => (
              <Accordion
                sx={{ width: 1 }}
                key={id}
                disableGutters
              >
                <Stack
                  justifyContent="space-between"
                  direction="row"
                >
                  <AccordionSummary sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                      Q{index + 1}: {question}
                    </Typography>
                  </AccordionSummary>
                  <FaqAction
                    question={question}
                    answer={answer}
                    id={id}
                  />
                </Stack>
                <AccordionDetails>
                  <Typography>{answer} </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>

          <FaqCreateDialog
            open={open}
            handleClose={handleClose}
          />
        </Stack>
      </Box>
    </Page>
  );
};
Faq.getLayout = (page) => <Layout variant="admin">{page}</Layout>;
export default Faq;
