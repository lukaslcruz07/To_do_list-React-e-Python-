import FormsTasks from "@/components/FormsTasks";
import ListTasks from "@/components/ListTasks";
import TasksComponent from "@/components/TaskComponent";

export default function Home() {
  return (
    <div>
      <FormsTasks/>
      <ListTasks>
        <TasksComponent/>
      </ListTasks>

    </div>
  );
}
