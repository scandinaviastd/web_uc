jQuery(document).ready(function ($) {
  $(".uc-page-index a.scrollLink").each(function () {
    var anchor = $(this).attr("href").replace("#", "");
    var linkText = $(this).text().trim();

  });

    $(".uc-page-index a.scrollLink, .uc-in-page-nav_link.scrollLink").on("click", function (e) {
      var targetId = $(this).attr("href");
      var $section = $(targetId);
      if ($section.length) {
          e.preventDefault();
          var isHeading = $section.is("h1, h2, h3, h4, h5, h6");
          var $scrollTarget = isHeading ? $section : ($section.find("h1.wp-block-heading, h2.wp-block-heading, h3.wp-block-heading").first().length ? $section.find("h1.wp-block-heading, h2.wp-block-heading, h3.wp-block-heading").first() : $section);
          var headerOffset = $("#site-header").outerHeight() || 50;
          var elementPosition = $scrollTarget.offset().top;
          var offsetPosition = elementPosition - headerOffset;
          // $(window).scrollTop(offsetPosition);
            $("html, body").animate({ scrollTop: offsetPosition }, 500); // scroll suav
      }
  });

});

document.addEventListener("DOMContentLoaded", function () {
  if (typeof grecaptcha !== "undefined" && ajax_object.recaptcha_site_key) {
    grecaptcha.ready(function () {
      grecaptcha
        .execute(ajax_object.recaptcha_site_key, { action: "submit" })
        .then(function (token) {
          var data = new FormData();
          data.append("action", "verify_recaptcha");
          data.append("token", token);

          axios
            .post(ajax_object.ajax_url, data)
            .then(function (response) {})
            .catch(function (error) {});
            // Scroll Spy para el menú local
            const links = document.querySelectorAll(".uc-in-page-nav_link.scrollLink, .uc-page-index a.scrollLink");
            if (links.length > 0) {
              const sections = Array.from(links).map(link => {
                const targetId = link.getAttribute("href");
                if (targetId && targetId !== "#") {
                  return document.querySelector(targetId);
                }
                return null;
              }).filter(section => section !== null);
              window.addEventListener("scroll", () => {
                let current = "";
                sections.forEach(section => {
                  const headerOffset = document.getElementById("site-header") ? document.getElementById("site-header").offsetHeight : 50;
                  const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerOffset - 20; // 20px padding
                  if (pageYOffset >= sectionTop) {
                    current = section.getAttribute("id");
                  }
                });
                links.forEach(link => {
                  link.classList.remove("active");
                  if (link.getAttribute("href") === "#" + current) {
                    link.classList.add("active");
                  }
                });
              });
            }
        });
    });
  }
});
