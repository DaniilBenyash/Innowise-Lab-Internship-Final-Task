import * as React from "react";
import BreadcrumbsMUI from "@mui/material/Breadcrumbs";
import { Link } from "../Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { FlexLayout } from "../FlexLayout";
import { useTranslation } from "react-i18next";
import { Box } from "../Box";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

type BreadcrumbsProps = {
  location: string;
  hrefHomePage: string;
  fullName?: string;
};

const Breadcrumbs = ({
  location,
  hrefHomePage,
  fullName,
}: BreadcrumbsProps) => {
  const { t } = useTranslation();
  const pathnames = location.split("/").filter(name => name);

  const breadcrumbs = pathnames.map((pathname, index, iterationArray) => {
    const name = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    if (Number(pathname)) {
      return (
        <Link to={pathname} key={pathname} color="secondary" underline="hover">
          <FlexLayout direction="row">
            <PersonOutlineOutlinedIcon sx={{ mr: 0.5 }} />
            {fullName}
          </FlexLayout>
        </Link>
      );
    }
    return (
      <Link
        underline="hover"
        to={pathname}
        key={pathname}
        disabled={index === iterationArray.length - 1}>
        {name}
      </Link>
    );
  });

  return (
    <Box
      position="fixed"
      top={64}
      fullWidth
      padding={20}
      backgroundColor="#f5f5f7">
      <BreadcrumbsMUI
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb">
        <Link underline="hover" to={hrefHomePage}>
          <FlexLayout direction="row">
            <HomeOutlinedIcon fontSize="medium" sx={{ mr: 0.5 }} />
            {t("common.home")}
          </FlexLayout>
        </Link>
        {breadcrumbs},
      </BreadcrumbsMUI>
    </Box>
  );
};

export { Breadcrumbs };
