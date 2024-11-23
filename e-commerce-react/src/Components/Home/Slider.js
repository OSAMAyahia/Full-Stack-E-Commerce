import React, { useEffect } from 'react';

const Slider = () => {

  // استخدام useEffect لتفعيل الكاروسيل عند تحميل الصفحة
  useEffect(() => {
    const carouselElement = document.querySelector('#carouselExampleCaptions');
    const carousel = new window.bootstrap.Carousel(carouselElement, {
      interval: 3000, // التغيير التلقائي كل 3 ثوانٍ
      ride: 'carousel', // بدء التشغيل التلقائي
    });
  }, []);

  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" style={{ background: "#95cad8" }}>
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://raw.githubusercontent.com/bakrgit/08-ecommerce-design-only/refs/heads/master/src/images/slider1.png" style={{ width: "25%", height: "400px", objectFit: "fill" }} alt="Slide 1" />
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://raw.githubusercontent.com/bakrgit/08-ecommerce-design-only/refs/heads/master/src/images/slider4.png" style={{ width: "25%", height: "400px", objectFit: "fill" }} alt="Slide 2" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://raw.githubusercontent.com/bakrgit/08-ecommerce-design-only/refs/heads/master/src/images/prod3.png" style={{ width: "35%", height: "400px", objectFit: "fill" }} alt="Slide 3" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Slider;
