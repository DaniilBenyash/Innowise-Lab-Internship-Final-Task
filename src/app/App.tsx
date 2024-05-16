import React from "react";
import { SignInPage } from "modules/auth/pages/SignInPage";
import { Route, Routes } from "react-router-dom";
import "app/i18n";
import { SignUpPage } from "modules/auth/pages/SignUpPage";
import { ProjectsDetailsPage, ProjectsPage } from "modules/projects/pages";
import { SkillsPage } from "modules/skills/page";
import { EmployeesPage } from "modules/employees/pages/EmployeesPage";
import { EmployeesLanguagesPage } from "modules/employees/pages/EmployeesLanguagesPage";
import { EmployeesSkillsPage } from "modules/employees/pages/EmployeesSkillsPage";
import { ProfilePage } from "modules/employees/pages/ProfilePage";
import { LayoutProfile } from "shared/components/LayoutProfile";
import { LanguagesPage } from "modules/languages/pages";
import { PositionsPage } from "modules/positions/pages";
import { Layout } from "shared/components/Layout";
import { DepartmentsPage } from "modules/departments/pages";
import {
  LOGIN_PAGE,
  SIGN_UP_PAGE,
  POSITIONS_PAGE,
  EMPLOYEES_CVS_PAGE,
  SKILLS_PAGE,
  LANGUAGES_PAGE,
  EMPLOYEES_PROFILE_PAGE,
  EMPLOYEES_PAGE,
  EMPLOYEES_SKILLS_PAGE,
  EMPLOYEES_LANGUAGES_PAGE,
  PROJECTS_PAGE,
  CVS_PAGE,
  DEPARTMENTS_PAGE,
  CVS_PROJECTS_PAGE,
  PROJECT_DETAILS_PAGE,
  CV_DETAILS_PAGE,
} from "./routing";
import { CVsPage } from "modules/cvs/pages/CVsPage";
import { CVDetailsPage } from "modules/cvs/pages/CVDetailsPage";
import { CVProjectsPage } from "modules/cvs/pages/CVProjectsPage";
import { Header } from "modules/common/components/Header";
import { ProtectedRoute } from "modules/common/components/ProtectedRoute";
import { EmployeesCVsPage } from "modules/employees/pages/EmployeesCVsPage";
import { NotFoundPage } from "modules/NotFoundPage";

export const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route
            element={
              <ProtectedRoute isAuthPage>
                <SignInPage />
              </ProtectedRoute>
            }
            path={LOGIN_PAGE}
          />
          <Route
            element={
              <ProtectedRoute isAuthPage>
                <SignUpPage />
              </ProtectedRoute>
            }
            path={SIGN_UP_PAGE}
          />
          <Route path="/" element={<Layout />}>
            <Route
              element={
                <ProtectedRoute>
                  <EmployeesPage />
                </ProtectedRoute>
              }
              path={EMPLOYEES_PAGE}
            />
            <Route
              path={EMPLOYEES_PAGE}
              element={
                <ProtectedRoute>
                  <LayoutProfile />
                </ProtectedRoute>
              }
            >
              <Route
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
                path={EMPLOYEES_PROFILE_PAGE}
              />
              <Route
                element={
                  <ProtectedRoute>
                    <EmployeesSkillsPage />
                  </ProtectedRoute>
                }
                path={EMPLOYEES_SKILLS_PAGE}
              />
              <Route
                element={
                  <ProtectedRoute>
                    <EmployeesLanguagesPage />
                  </ProtectedRoute>
                }
                path={EMPLOYEES_LANGUAGES_PAGE}
              />
              <Route
                element={
                  <ProtectedRoute>
                    <EmployeesCVsPage />
                  </ProtectedRoute>
                }
                path={EMPLOYEES_CVS_PAGE}
              />
            </Route>
            <Route
              element={
                <ProtectedRoute>
                  <ProjectsPage />
                </ProtectedRoute>
              }
              path={PROJECTS_PAGE}
            />
            <Route
              element={
                <ProtectedRoute>
                  <ProjectsDetailsPage />
                </ProtectedRoute>
              }
              path={PROJECT_DETAILS_PAGE}
            />
            <Route
              element={
                <ProtectedRoute>
                  <SkillsPage />
                </ProtectedRoute>
              }
              path={SKILLS_PAGE}
            />
            <Route
              element={
                <ProtectedRoute>
                  <LanguagesPage />
                </ProtectedRoute>
              }
              path={LANGUAGES_PAGE}
            />
            <Route
              element={
                <ProtectedRoute>
                  <PositionsPage />
                </ProtectedRoute>
              }
              path={POSITIONS_PAGE}
            />
            <Route
              element={
                <ProtectedRoute>
                  <DepartmentsPage />
                </ProtectedRoute>
              }
              path={DEPARTMENTS_PAGE}
            />
            <Route
              element={
                <ProtectedRoute>
                  <CVDetailsPage />
                </ProtectedRoute>
              }
              path={CV_DETAILS_PAGE}
            />
            <Route
              element={
                <ProtectedRoute>
                  <CVsPage />
                </ProtectedRoute>
              }
              path={CVS_PAGE}
            />
            <Route
              element={
                <ProtectedRoute>
                  <CVProjectsPage />
                </ProtectedRoute>
              }
              path={CVS_PROJECTS_PAGE}
            />
            <Route element={<NotFoundPage />} path="/" />
            <Route element={<NotFoundPage />} path="*" />
          </Route>
          <Route element={<NotFoundPage />} path="/" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </>
  );
};
