import Layout from "@/views/cockpit";
//驾驶舱-
export default {
  path: "/cockpit",
  component: Layout,
  redirect: "/cockpit-overview",
  name: "驾驶舱",
  // hidden: true,
  meta: { title: "驾驶舱", icon: "menu-command" },
  children: [
    {
        path: "/cockpit-overview", 
        name: "cockpit-overview",
        component: () => import("@/views/cockpit/cockpit-overview-v1/normalScreen.vue"),// "@/views/cockpit-overview"
     meta:{title:'路网驾驶舱'}
    },
    {
        path: "/cockpit-bridge",
        name: " normalScreen",
        component: () => import("@/views/cockpit/cockpit-bridge-v1/normalScreen.vue"),
        meta:{title:"桥梁驾驶舱"}
      },
  ],
};
