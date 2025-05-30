import { Link} from "react-router-dom";


function WelcomePage() {


    return (
        <section className="welcome-page">
            <div>
                <h3>Welcome to your go-to platform for discovering and booking fitness classes that match your lifestyle. Whether you're into high-intensity workouts, relaxing yoga sessions, or something in between, we’ve got something for every body and every goal. Explore top-rated classes and read real reviews —all in one place</h3>
            </div>
            <div>
            <Link to="/class" className="welcome-class-btn"> Explore All Our Fitness Classes </Link>
            </div>
        </section>
    )
}

export default WelcomePage;