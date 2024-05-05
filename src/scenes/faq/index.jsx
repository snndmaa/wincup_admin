import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          How do I create user accounts for zombies on the educational platform?          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          To create user accounts for zombies, navigate to the admin dashboard and look for the "User Management" section. From there, you can add new users and specify their roles as zombies.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Can zombies access the same courses as humans?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, zombies have access to the same courses as humans. However, some courses may be specifically tailored to address unique challenges or learning styles for zombies.          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          What measures are in place to ensure a safe and inclusive learning environment for zombies?          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Our platform is committed to providing a safe and inclusive learning environment for all users, including zombies. We have implemented strict guidelines against discrimination and harassment and provide resources for users to report any issues they encounter.          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          How are the course materials adapted to accommodate zombies' learning needs?          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Our instructional design team works to adapt course materials to accommodate zombies' unique learning needs, such as incorporating visual aids, interactive content, and simplified language to enhance comprehension.          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          How do I troubleshoot technical issues reported by zombie users?          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          If zombie users encounter technical issues, our support team is available to assist them. We provide troubleshooting guides and offer personalized support to ensure that all users can access and navigate the platform effectively.          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
