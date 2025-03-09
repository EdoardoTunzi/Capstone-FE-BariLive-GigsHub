import Marquee from "react-fast-marquee";
import "./PicsGridMarquee.css";

const PicsGridMarquee = () => {
  return (
    <Marquee speed={20} className="marquee py-5">
      <div className="img1 marquee-item">
        <img src="/src/assets/marquee/1.jpg" alt="" />
      </div>
      <div className="img2 marquee-item">
        <img src="/src/assets/marquee/2.jpg" alt="" />
      </div>
      <div className="img3 marquee-item">
        <img src="/src/assets/marquee/3.jpg" alt="" />
      </div>
      <div className="img1 marquee-item">
        <img src="/src/assets/marquee/4.jpg" alt="" />
      </div>
      <div className="img2 marquee-item">
        <img src="/src/assets/marquee/5.jpg" alt="" />
      </div>
      <div className="img3 marquee-item">
        <img src="/src/assets/marquee/6.jpg" alt="" />
      </div>
      <div className="img1 marquee-item">
        <img src="/src/assets/marquee/7.jpg" alt="" />
      </div>
      <div className="img2 marquee-item">
        <img src="/src/assets/marquee/8.jpg" alt="" />
      </div>
      <div className="img3 marquee-item">
        <img src="/src/assets/marquee/9.jpg" alt="" />
      </div>
      <div className="img1 marquee-item">
        <img src="/src/assets/marquee/10.jpg" alt="" />
      </div>
    </Marquee>
  );
};
export default PicsGridMarquee;
