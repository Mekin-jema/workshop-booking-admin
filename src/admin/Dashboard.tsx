
// import Heading from "../utils/Heading";
// import AdminProtected from "../hooks/adminProtected";
import AdminSidbar from "../components/Admin/AdminSidbar";
import DashboardHeader from "../components/Admin/sidebar/DashboardHeader";

type Props = {};

const Dashboard = (props: Props) => {
  // Capitalize component name for convention
  return (
    <div>
      {/* <AdminProtected> */}
      {/* <Heading
          title="Elearn - Admin"
          description="Elearning is a platform for students to learn and get help from teachers."
          keywords="Programming, MERN, Redux, Machine Learning"
        /> */}
      <div className="flex h-[200vh]">
        <div className="w-1/5 xl:w-[16%]">
          <AdminSidbar />
        </div>
        <div className="w-4/5">
          <DashboardHeader />
        </div>
      </div>
      {/* </AdminProtected> */}
    </div>
  );
};

export default Dashboard; // Ensure the component name matches the export
