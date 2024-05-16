import React from "react";
import { EllipsisMenu, MenuItem } from "shared/components/EllipsisMenu";
import { useTranslation } from "react-i18next";
import { useAuth } from "modules/common/utils";

type MenuCVsProps = {
  userId: string;
  onDelete: () => void;
};

export const MenuCVs = ({ onDelete, userId }: MenuCVsProps) => {
  const { t } = useTranslation();
  const { userId: id, userRole } = useAuth();
  const isDisabled = !(userId === id || userRole === "Admin");
  return (
    <EllipsisMenu>
      <MenuItem onClick={onDelete} disabled={isDisabled}>
        {t("cvProjectsPage.delete")}
      </MenuItem>
    </EllipsisMenu>
  );
};
