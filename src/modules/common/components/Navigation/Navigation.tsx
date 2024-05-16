import React, { useMemo } from "react";
import { Drawer } from "shared/components/Drawer";
import { NavigationList } from "shared/components/NavigationList";
import PeopleIcon from "@mui/icons-material/People";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import BusinessIcon from "@mui/icons-material/Business";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MovingIcon from "@mui/icons-material/Moving";
import TranslateIcon from "@mui/icons-material/Translate";
import { Toolbar } from "shared/components/Toolbar";
import { IconButton } from "shared/components/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { NavigationItemType } from "shared/components/NavigationItem";
import {
  EMPLOYEES_PAGE,
  PROJECTS_PAGE,
  CVS_PAGE,
  DEPARTMENTS_PAGE,
  POSITIONS_PAGE,
  SKILLS_PAGE,
  LANGUAGES_PAGE,
} from "app/routing";

type NavigationProps = {
  isOpened: boolean;
  onClose: () => void;
};

export const Navigation = ({ isOpened, onClose }: NavigationProps) => {
  const { t, i18n } = useTranslation();

  const list = useMemo((): NavigationItemType[] => {
    return [
      {
        text: t("navigation.employees"),
        icon: <PeopleIcon />,
        link: EMPLOYEES_PAGE,
      },
      {
        text: t("navigation.projects"),
        icon: <FolderCopyIcon />,
        link: PROJECTS_PAGE,
      },
      {
        text: t("navigation.resume"),
        icon: <ContactPageIcon />,
        link: CVS_PAGE,
        hasDivider: true,
      },
      {
        text: t("navigation.departments"),
        icon: <BusinessIcon />,
        link: DEPARTMENTS_PAGE,
      },
      {
        text: t("navigation.positions"),
        icon: <WorkOutlineIcon />,
        link: POSITIONS_PAGE,
      },
      { text: t("navigation.skills"), icon: <MovingIcon />, link: SKILLS_PAGE },
      {
        text: t("navigation.languages"),
        icon: <TranslateIcon />,
        link: LANGUAGES_PAGE,
      },
    ];
  }, [i18n.language]);

  return (
    <Drawer isOpened={isOpened} onClose={onClose}>
      <Toolbar type="primary">
        <IconButton ariaLabel="" onClick={onClose}>
          <CloseIcon color="secondary" />
        </IconButton>
      </Toolbar>
      <NavigationList list={list} onClick={onClose} />
    </Drawer>
  );
};
