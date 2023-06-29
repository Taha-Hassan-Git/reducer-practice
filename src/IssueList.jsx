const IssueList = ({ project, handleDeleteIssue }) => {
  return (
    <ul>
      {project.map((task) =>
        task.issues.map((issue) => (
          <Issue
            handleDeleteIssue={handleDeleteIssue}
            key={issue.id}
            issue={issue}
          />
        ))
      )}
    </ul>
  );
};

const Issue = ({ issue, handleDeleteIssue }) => {
  return (
    <>
      <input value={issue.title} />
      <br />
      <input value={issue.description} />
      <br />
      <input type="checkbox" checked={issue.done} />
      <button
        onClick={() => {
          handleDeleteIssue(issue);
        }}
      >
        Delete
      </button>
      <br />
      <br />
    </>
  );
};

export default IssueList;
