import { Component } from "react";
import danielpic from './images/daniel-pic.jpeg'
import teresapic from './images/teresa-pic.jpeg'


class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    return (
      <>
        <h2>About Us</h2>
        <section id="daniel">
          <img id="picOfDaniel" src={danielpic} alt="portrait of daniel" style={{width: '400px'}}/>
          <h3>Daniel</h3>
          <p>
              Daniel graduated from Iowa State University in 2013 with a degree in materials engineering and a minor in music. He has worked a wide variety of jobs, from retail sales to warehouse work to church ministry. He is now pursuing a career in software development as a student at Delta V.
          </p>
        </section>
        <section id="teresa">
          <img id="picOfTeresa" src={teresapic} alt="portrait of teresa"  style={{width: '400px'}}/>
          <h3>Teresa</h3>
          <p>She recently returned to the area after living the past seven years in the San Francisco Bay area. She is retired from Procter & Gamble after 22 years of service. Her most recent role with P&G was that of Analyst I (Technical and Administrative), supporting a NorCal regional sales team. Her team broke all sales records for four consecutive years. She is currently pursuing a Software Development certification through Delta V. My hobbies include walking, biking, and gardening.</p>
        </section>
      </>
    )
  }
};
export default Profile;
