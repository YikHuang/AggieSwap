import CreateAccount from "./CreateAccount";


function Home() {
  return (
    <>
      <div className="description">
        <h2>Description</h2>
      </div>
      <div className="radiusButton">
        <a href="/swap" className="button">Start AggieSwap</a>
      </div>
      <CreateAccount />
    </>
  );
}

export default Home;
