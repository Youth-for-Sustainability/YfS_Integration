let text = document.getElementById("text");
let bird1 = document.getElementById("bird1");
let bird2 = document.getElementById("bird2");
let btn = document.getElementById("btn");
let rocks = document.getElementById("rocks");
let forest = document.getElementById("forest");
let water = document.getElementById("water");
let header = document.getElementById("header");

$(document).ready(function () {
  $(".counter-value").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 3500,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });
});

window.addEventListener("scroll", function () {
  let value = window.scrollY;

  text.style.top = 50 + value * -0.1 + "%";
  bird1.style.top = 10 + value * -0.2 + "px";
  bird1.style.left = value * 1.3 + "px";
  bird2.style.top = 50 + value * -0.5 + "px";
  bird2.style.left = value * -5 + "px";
  btn.style.marginTop = value * 1.5 + "px";
  rocks.style.top = value * -0.12 + "px";
  forest.style.top = value * 0.25 + "px";

  header.style.top = value * 0.5 + "px";
});

$(".count").each(function () {
  $(this)
    .prop("Counter", 0)
    .animate(
      {
        Counter: $(this).text(),
      },
      {
        duration: 15000,
        easing: "swing",
        step: function (now) {
          $(this).text(Math.ceil(now));
        },
      }
    );
});

const portfolio = document.querySelector(".portfolio-gallery"),
  portfolioItems = portfolio.querySelectorAll(".portfolio-item"),
  portfolioCats = document.querySelectorAll(".portfolio-cats > li");
let parentWidth = portfolio.offsetWidth,
  windowWidth = window.innerWidth;

portfolioCats.forEach((cat) => {
  cat.addEventListener("pointerdown", function () {
    const dataFilter = this.dataset.filter;
    const el = [];

    if (dataFilter === "*") {
      positionItems(portfolioItems);
    } else {
      portfolioItems.forEach((item) => {
        if (item.dataset.filter == dataFilter) {
          el.push(item);
        } else {
          item.style.cssText = "transform: scale(0.1); opacity: 0;";
        }
      });
      positionItems(el);
    }
  });
});
// Count Number of Items Per Row
function countRowsItems() {
  let rowItems = 0;
  if (windowWidth <= 768) {
    rowItems = 1;
  } else if (windowWidth <= 992) {
    rowItems = 2;
  } else {
    rowItems = 3;
  }
  return rowItems;
}
// Position each item in its place
function positionItems(items) {
  let rowItems = countRowsItems();
  let y = 0;
  let x = 0;
  let itemCount = 0;
  items.forEach((item, i) => {
    item.style.cssText = `transform: translate3d(${
      x * (parentWidth / rowItems)
    }px, ${y * 220}px, 0); opacity: 1;`;
    x++;
    if (x % rowItems == 0) {
      y++;
      x = 0;
    }
    itemCount = i;
  });
  portfolio.style.height = `${Math.ceil(itemCount / rowItems) * 220}px`;
}

positionItems(portfolioItems);

window.addEventListener("resize", () => {
  parentWidth = portfolio.offsetWidth;
  windowWidth = window.innerWidth;
  positionItems(portfolioItems);
});

Vue.config.devtools = true;

Vue.component("card", {
  template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ["dataImage"],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null,
  }),

  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 30;
      const rY = this.mousePY * -30;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`,
      };
    },
    cardBgTransform() {
      const tX = this.mousePX * -40;
      const tY = this.mousePY * -40;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`,
      };
    },
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`,
      };
    },
  },

  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(() => {
        this.mouseX = 0;
        this.mouseY = 0;
      }, 1000);
    },
  },
});

const app = new Vue({
  el: "#app",
});
