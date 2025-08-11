import { AppSidebar } from "../app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { SectionContainer } from "./SectionContainer";

type propsSideNav = {
  children: React.ReactNode;
};

const SideNav = (props: propsSideNav) => {
  const { children } = props;
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default SideNav;
