import React, { useMemo } from "react";
import { FlexLayout } from "shared/components/FlexLayout";
import { P } from "shared/components/Typography";
import { Avatar } from "shared/components/Avatar";
import { EllipsisMenu, MenuItem } from "shared/components/EllipsisMenu";
import { Link } from "shared/components/Link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LANGUAGES_PAGE, EMPLOYEES_PROFILE_PAGE } from "app/routing";
import { authService } from "modules/auth/services/authService";
import { generatePath } from "react-router";
import { useGetUser } from "modules/employees/hooks";

type UserInfoProps = {
  userId: string;
  icon?: string;
};

export const UserInfo = ({ userId }: UserInfoProps) => {
  const { t, i18n } = useTranslation();
  const { user } = useGetUser(userId);
  const list = useMemo(() => {
    return [
      {
        text: t("userInfo.profile"),
        icon: <AccountCircleIcon color="info" />,
        link: generatePath(EMPLOYEES_PROFILE_PAGE, { id: userId }),
      },
      {
        text: t("userInfo.setting"),
        icon: <SettingsIcon color="info" />,
        link: LANGUAGES_PAGE,
        hasDivider: true,
      },
      {
        text: t("userInfo.logout"),
        icon: <LogoutIcon color="info" />,
        onClick: () => authService.logOut(),
      },
    ];
  }, [i18n.language]);

  return (
    <FlexLayout direction="row" spacing="buttons">
      <P size="small">{user?.profile?.fullName}</P>
      <EllipsisMenu
        icon={<Avatar size="small" name={user?.profile?.fullName} />}>
        {list.map(item => {
          return (
            <Link to={item.link} key={item.text}>
              <MenuItem onClick={item.onClick}>
                <FlexLayout direction="row" spacing="buttons">
                  {item.icon}
                  <P size="medium" marginRight={5} color="info">
                    {item.text}
                  </P>
                </FlexLayout>
              </MenuItem>
              {item.hasDivider && <Divider />}
            </Link>
          );
        })}
      </EllipsisMenu>
    </FlexLayout>
  );
};
