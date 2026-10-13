import FormsTasks from "@/components/FormsTasks";
import ListTasks from "@/components/ListTasks";
import TasksComponent from "@/components/TaskComponent";

const TASKS_CAMINHO = "http://127.0.0.1:8000"

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
