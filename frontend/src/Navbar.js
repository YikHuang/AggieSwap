
function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
        <div class="container px-4 px-lg-5">
            <a class="navbar-brand" href="/">AggieSwap</a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto my-2 my-lg-0">
                    <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="/swap">Swap</a></li>
                    <li class="nav-item"><a class="nav-link" href="/wallet">Wallet</a></li>
                    {/* <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li> */}
                </ul>
            </div>
        </div>
    </nav>




    // <nav className="navbar">
    //   {/* <h1>AggieSwap</h1> */}
    //   <div className="links">
    //     <a href="/">Home</a>
    //     <a href="/swap">Swap</a>
    //     <a href="/wallet">Wallet</a>
    //   </div>
    // </nav>
  );
}

export default Navbar;
