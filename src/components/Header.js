import React,{ useState, useEffect } from "react";
import axios from "axios";

function Header() {

    const [test, setTest] = useState({});

    // useEffect(() => {
	// 	debugger
    //   axios.get("/api/deductions")
    //     .then(data => setTest(data.name))
    // }, [])
    
	return (
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
                <span class="navbar-brand mb-0 h1">Paylocity Assessment</span>
			</div>
		</nav>
	);
}

export default Header;