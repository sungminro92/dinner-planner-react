import React from "react";
// import SimpleReactFooter from "simple-react-footer";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  // WHAT TO PUT IN FOOTER
  // 1. APP NAME AND DESCRIPTION
  // 2. Made with - React, CodeSandbox, MealDB, CocktailDB
  // 3. Contact - Github, Instagram,
  // 4. Copyright - year, my name,

  return (
    <footer>
      <div className=" max-width">
        <div className="footer-row">
          <div className="footer-col flex-2">
            <h4>Plan D: Ultimate dinner planner for your party table</h4>
            <p>
              A web-based recipe app built with React. Users can search for food
              & cocktail recipes, save them, and utilize them for better
              preparation experience.
            </p>
          </div>
          <div className="footer-col">
            <h4>Built with</h4>
            <ul>
              <li>
                <a className="footer-list" href="https://reactjs.org/">
                  React
                </a>
              </li>
              <li>
                <a
                  className="footer-list"
                  href="https://codesandbox.io/dashboard/home?workspace=cfe784e8-2577-4d87-a93e-c276fbcc8d47"
                >
                  CodeSandBox
                </a>
              </li>
              <li>
                <a
                  className="footer-list"
                  href="https://www.themealdb.com/api.php"
                >
                  MealDB API
                </a>
              </li>
              <li>
                <a
                  className="footer-list"
                  href="https://www.thecocktaildb.com/api.php"
                >
                  CocktailDB API
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>About me</h4>
            <div className="social-links">
              {/* <a href="#">Github</a> */}
              <SocialIcon
                className="socia-icon"
                url="https://sungminro92.github.io/"
              />
              <SocialIcon
                className="socia-icon"
                url="https://www.instagram.com/minnie_artech/"
              />
              <SocialIcon
                className="socia-icon"
                url="mailto:sungminro1992@gmail.com"
              />

              <SocialIcon
                className="socia-icon"
                url="https://codesandbox.io/s/dinner-planner-ash-pe-8v6d04"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
  // const description =
  //   "According to wikipedia, the cat (Felis catus) is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family. A cat can either be a house cat, a farm cat or a feral cat; the latter ranges freely and avoids human contact.";
  // const title = "Plan";
  // const columns = [
  //   {
  //     title: "Resources",
  //     resources: [
  //       {
  //         name: "About",
  //         link: "/about"
  //       },
  //       {
  //         name: "Careers",
  //         link: "/careers"
  //       },
  //       {
  //         name: "Contact",
  //         link: "/contact"
  //       },
  //       {
  //         name: "Admin",
  //         link: "/admin"
  //       }
  //     ]
  //   },
  //   {
  //     title: "Legal",
  //     resources: [
  //       {
  //         name: "Privacy",
  //         link: "/privacy"
  //       },
  //       {
  //         name: "Terms",
  //         link: "/terms"
  //       }
  //     ]
  //   },
  //   {
  //     title: "Visit",
  //     resources: [
  //       {
  //         name: "Locations",
  //         link: "/locations"
  //       },
  //       {
  //         name: "Culture",
  //         link: "/culture"
  //       }
  //     ]
  //   }
  // ];

  // return (
  //   <SimpleReactFooter
  //     description={description}
  //     title={title}
  //     columns={columns}
  //     linkedin="fluffy_cat_on_linkedin"
  //     facebook="fluffy_cat_on_fb"
  //     twitter="fluffy_cat_on_twitter"
  //     instagram="fluffy_cat_live"
  //     youtube="UCFt6TSF464J8K82xeA?"
  //     pinterest="fluffy_cats_collections"
  //     copyright="black"
  //     iconColor="black"
  //     backgroundColor="#FDB196"
  //     borderTop="1px solid black"
  //     fontColor="black"
  //     copyrightColor="darkgrey"
  //   />
  // );
};

export default Footer;
