import React, { useState } from "react";
import { Toolbar } from "shared/components/Toolbar";
import { AppBar } from "shared/components/AppBar";
import { FlexLayout } from "shared/components/FlexLayout/FlexLayout";
import { IconButton } from "shared/components/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useLanguagesContext } from "app/theme/LanguagesProvider";
import LanguageIcon from "@mui/icons-material/Language";
import { SelectInput } from "shared/components/SelectInput";
import { ButtonNavigation } from "shared/components/ButtonNavigation";
import { Box } from "shared/components/Box";
import { LOGIN_PAGE, SIGN_UP_PAGE } from "app/routing";
import { useTranslation } from "react-i18next";
import { Navigation } from "modules/common/components/Navigation";
import { useAuth } from "modules/common/utils";
import { UserInfo } from "../UserInfo";
import { Outlet } from "react-router";

export const Header = () => {
  const { t } = useTranslation();
  const { languages, handleChangeLanguage, defaultLanguage } =
    useLanguagesContext();
  const { isAuth, userId } = useAuth();

  const [isNavigationOpened, setIsNavigationOpened] = useState(false);

  const handleOpenNavigation = () => setIsNavigationOpened(true);
  const handleCloseNavigation = () => setIsNavigationOpened(false);

  const changedLanguages = languages.map(language => {
    return { value: language, label: language.toUpperCase() };
  });

  return (
    <>
      <AppBar>
        {isAuth ? (
          <div>
            <Toolbar justifyContent="space-between">
              <IconButton
                edge="start"
                ariaLabel="menu"
                onClick={handleOpenNavigation}
                color="secondary"
              >
                <MenuIcon />
              </IconButton>
              <FlexLayout direction="row" spacing="chips">
                <LanguageIcon color="info" />
                <Box paddingRight={40}>
                  <SelectInput
                    values={changedLanguages}
                    defaultValue={defaultLanguage}
                    onChange={handleChangeLanguage}
                    type="primary"
                    variant="standard"
                  />
                </Box>
                <UserInfo userId={userId} />
              </FlexLayout>
              <Navigation
                isOpened={isNavigationOpened}
                onClose={handleCloseNavigation}
              />
            </Toolbar>
          </div>
        ) : (
          <Toolbar alignItems="flex-end" justifyContent="center">
            <ButtonNavigation to={LOGIN_PAGE}>
              {t("header.signin")}
            </ButtonNavigation>
            <ButtonNavigation to={SIGN_UP_PAGE}>
              {t("header.signup")}
            </ButtonNavigation>
          </Toolbar>
        )}
      </AppBar>
      <Outlet />
    </>
  );
};
