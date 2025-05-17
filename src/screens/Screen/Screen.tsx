import React from "react";
import { FrameByAnima } from "./sections/FrameByAnima/FrameByAnima";
import { HeaderByAnima } from "./sections/HeaderByAnima";
import { LeftMenuByAnima } from "./sections/LeftMenuByAnima";
import { ProjectsView } from "./sections/ProjectsView";
import { TeamsView } from "./sections/TeamsView";
import { ChatsView } from "./sections/ChatsView";
import { ApplicationsView } from "./sections/ApplicationsView";
import { StartScreen } from "./StartScreen";
import { LoginScreen } from "./LoginScreen";
import { RegisterScreen } from "./RegisterScreen";
import { CreateProjectScreen } from "./CreateProjectScreen";

// Типы экранов
const SCREENS = {
  START: "start",
  LOGIN: "login",
  REGISTER: "register",
  CREATE_PROJECT: "createProject",
  DASHBOARD: "dashboard",
} as const;
type ScreenType = keyof typeof SCREENS;

export const Screen = (): JSX.Element => {
  const [activeView, setActiveView] = React.useState("dashboard");
  const [currentScreen, setCurrentScreen] = React.useState<ScreenType>("START");

  const handleStartSelect = (action: "login" | "register" | "createProject") => {
    if (action === "login") setCurrentScreen("LOGIN");
    else if (action === "register") setCurrentScreen("REGISTER");
    else if (action === "createProject") setCurrentScreen("CREATE_PROJECT");
  };

  // Обработчики возврата и перехода
  const handleBackToStart = () => setCurrentScreen("START");
  const handleGoToRegister = () => setCurrentScreen("REGISTER");
  const handleGoToLogin = () => setCurrentScreen("LOGIN");
  const handleProjectSuccess = () => alert("Проект отправлен! (здесь будет модалка)");
  const handleLoginSuccess = () => setCurrentScreen("DASHBOARD");

  const renderView = () => {
    switch (activeView) {
      case "projects":
        return <ProjectsView />;
      case "teams":
        return <TeamsView />;
      case "chats":
        return <ChatsView />;
      case "applications":
        return <ApplicationsView />;
      default:
        return <FrameByAnima />;
    }
  };

  // Рендер по текущему экрану
  if (currentScreen === "START") {
    return <StartScreen onSelect={handleStartSelect} />;
  }
  if (currentScreen === "LOGIN") {
    return <LoginScreen onBack={handleBackToStart} onRegister={handleGoToRegister} onLoginSuccess={handleLoginSuccess} />;
  }
  if (currentScreen === "REGISTER") {
    return <RegisterScreen onBack={handleBackToStart} onLogin={handleGoToLogin} />;
  }
  if (currentScreen === "CREATE_PROJECT") {
    return <CreateProjectScreen onBack={handleBackToStart} onSuccess={handleProjectSuccess} />;
  }

  return (
    <div className="flex h-screen w-full bg-main-colorsbackground-alt overflow-hidden">
      <LeftMenuByAnima onViewChange={setActiveView} activeView={activeView} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <HeaderByAnima />
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
};