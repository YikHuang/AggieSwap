import CreateAccount from "./CreateAccount";


function Home() {
  return (
    <>
      {/* <div className="description">
        <h2>Description</h2>
      </div> */}
      {/* <div className="radiusButton">
        <a href="/swap" className="button">Start AggieSwap</a>
      </div> */}
      {/* <CreateAccount /> */}
      <header class="masthead">
            <div class="container px-4 px-lg-5 h-100">
                <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div class="col-lg-8 align-self-end">
                        <h1 class="text-white font-weight-bold">AggieSwap</h1>
                        <hr class="divider" />
                    </div>
                    <div class="col-lg-8 align-self-baseline">
                      <div class="text-white-75 mb-5">
                        <p class="font-grp-1">Make the economy of Davis vitalize itself</p>
                        <p class="font-grp-1">Connect the economy system of Davis to the world</p>
                      </div>

                        <a href="/swap" class="btn btn-primary btn-xl">Start AggieSwap</a>
                        {/* <a class="btn btn-primary btn-xl" href="#about">Find Out More</a> */}
                        {/* <a href="/CreateAccount" class="btn btn-primary btn-xl">Create Account</a> */}
                        <CreateAccount />
                    </div>
                </div>
            </div>
        </header>
    </>
    

    
    
  );
}

export default Home;
