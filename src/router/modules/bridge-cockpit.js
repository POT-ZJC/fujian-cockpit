import Layout from "@/views/bridge-cockpit";
//驾驶舱-大数据
export default {
  path: "/bridge-cockpit",
  component: Layout,
  redirect: "/bridge-cockpit/home",
  name: "驾驶舱",
  // hidden: true,
  meta: { title: "驾驶舱", icon: "menu-command" },

  children: [
    { 
      path: "/bridge-cockpit/home",
      name: "cockpit-home",
      component: () => import("@/views/bridge-cockpit/home"),
      // hidden: true,
      meta: { title: "驾驶舱首页", icon: "example" },
    },
    {
      path: "/bridge-cockpit/bridgeManage",
      name: "bridgeManage",
      redirect: "/bridge-cockpit/bridgeManage/maintenance",
      component: () => import("@/views/bridge-cockpit/bridgeManage"),
      // hidden: true,
      meta: { title: "桥梁管理" },
      children: [
        {
          path: "/bridge-cockpit/bridgeManage/maintenance",
          name: "maintenance",
          // component: () => import("@/views/bridge-cockpit/bridgeManage/infrastructure"),
          component: () => import("@/views/bridge-cockpit/bridgeManage/maintenance"),
          // hidden: true,
          meta: { type: "2",pageTitle:'福建省长大桥-检查养护' },
        },
        {
          path: "/bridge-cockpit/bridgeManage/infrastructure",
          name: "infrastructure",
          component: () => import("@/views/bridge-cockpit/bridgeManage/infrastructure"),
          // hidden: true,
          meta: { type: "2",pageTitle:'福建省长大桥-桥梁管理' },
        },
        {
          path: "/bridge-cockpit/bridgeManage/maintenance-panoramic",
          name: "maintenance-panoramic",
          component: () => import("@/views/bridge-cockpit/bridgeManage/maintenance-panoramic"),
          // hidden: true,
          meta: { type: "2",pageTitle:'福建省长大桥-养护全景' },
        },
      ],
    },
  ],
};
