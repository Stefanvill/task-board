import Column from "./Components/Column";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import TaskCard from "./Components/TaskCard";

function App() {
  return (
    <div className="app-shell">
      <Header></Header>
      <main>
        <section className="task-board">
          <Column title="ToDo">
            <TaskCard
              title="cleaning classroom"
              id={1}
              description="Clean classroom 9"
              assignee="Steffe"
              category="Cleaning"
              priority="low"
            ></TaskCard>
          </Column>
          <Column title="Doing">
            <TaskCard
              title="Build form"
              id={2}
              description="Build a register form"
              assignee="Jakob"
              category="Coding"
              priority="medium"
            ></TaskCard>
          </Column>
          <Column title="Done">
            <TaskCard
              title="Write tests"
              id={3}
              description="Write tests for footer,Header & task card"
              assignee="Joakim"
              category="Coding"
              priority="high"
            ></TaskCard>
          </Column>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
