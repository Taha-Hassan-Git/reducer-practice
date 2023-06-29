import { useReducer } from "react";
import TaskList from "./TaskList.jsx";
import IssueList from "./IssueList.jsx";

function tasksReducer(project, action) {
  switch (action.type) {
    case "CHANGE_TASK": {
      return project.map((task) => {
        if (task.id === action.task.id) {
          return action.task;
        } else {
          return task;
        }
      });
    }
    case "DELETE_TASK": {
      return project.filter((task) => task.id !== action.id);
    }
    case "CHANGE_ISSUE": {
      return project.map((task) => {
        if (task.id === action.issue.taskid) {
          task.issues.map((issue) => {
            if (issue.id === action.issue.id) {
              return action.issue;
            }
            return issue;
          });
        }
        return task;
      });
    }
    case "DELETE_ISSUE": {
      return project.map((task) => {
        if (task.id === action.issue.taskid) {
          // This task matches, so filter out the deleted issue
          return {
            ...task, // Copy all properties of the task
            issues: task.issues.filter((issue) => issue.id !== action.issue.id), // Except replace issues with a filtered array
          };
        } else {
          // This task doesn't match, so return it as is
          return task;
        }
      });
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
}

export default function TaskApp() {
  const [project, dispatch] = useReducer(tasksReducer, initialProject);

  function handleChangeTask(task) {
    dispatch({
      type: "CHANGE_TASK",
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "DELETE_TASK",
      id: taskId,
    });
  }

  function handleDeleteIssue(issue) {
    dispatch({ type: "DELETE_ISSUE", issue });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <TaskList
        project={project}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
      <IssueList handleDeleteIssue={handleDeleteIssue} project={project} />
    </>
  );
}

/* let nextId = 3;
let nextIssueId = 5; */
const initialProject = [
  {
    id: 0,
    text: "Visit Kafka Museum",
    done: false,
    issues: [
      {
        id: 0,
        title: "Find the Museum",
        description: "Look up the museum on google maps.",
        done: false,
        taskid: 0,
      },
      {
        id: 1,
        title: "Walk into the Museum",
        description: "Go in through the front door and walk forwards",
        done: false,
        taskid: 0,
      },
    ],
  },
  {
    id: 1,
    text: "Watch a puppet show",
    done: false,
    issues: [
      {
        id: 2,
        title: "heckle the puppet master",
        description: "teehee",
        done: false,
        taskid: 1,
      },
      {
        id: 3,
        title: "heckle the puppets",
        description: "teeheehee",
        done: false,
        taskid: 1,
      },
    ],
  },
  {
    id: 2,
    text: "Lennon Wall pic",
    done: false,
    issues: [
      {
        id: 4,
        title: "buy 5000 lemons",
        description: "you need a lot of lemons in order to build a lemon wall",
        done: true,
        taskid: 2,
      },
    ],
  },
];
