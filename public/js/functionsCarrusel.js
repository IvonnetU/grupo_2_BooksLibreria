$('.novedades').slick({
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        slidesToShow: 6,
        responsive: [
            {
                breakpoint: 901,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 4,              
                }
            },
            {
                breakpoint: 581,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 2,
                }
            }
        ]
    });