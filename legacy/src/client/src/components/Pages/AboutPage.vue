<template>
  <div id="about-container">
    <section id="hero">
      <img src="@/assets/orca.svg" alt="Orca in the Sea" />
    </section>

    <section id="about-content">
      <div id="intro">
        <h1>About Acartia</h1>
        <p>
          Welcome to Acartia! Acartia is a collaborative platform designed to share information about the whereabouts of
          marine animals in the Salish Sea. It's named after a tiny creature called a copepod found in Puget Sound. But
          its primary goal is to help protect the endangered Southern Resident killer whales. Dive into our platform to
          discover the whereabouts of marine life in this vibrant ecosystem.
        </p>
      </div>

      <div id="faq">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-items">
          <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
            <button class="faq-question" @click="togglePanel(index)">
              {{ faq.question }}
              <span class="toggle-icon" :class="{ active: faq.open }">+</span>
            </button>
            <div class="faq-answer" v-show="faq.open">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>

      <div id="links">
        <h2>Want to do more? Check out these links!</h2>
        <div class="link-items">
          <div class="link-item" @click="linkToContributions">
            <div class="header">
              <div class="icon-text-container">
                <img src="@/assets/hand-icon.svg" alt="Hand Icon" class="icon" />
                <span>How to Contribute</span>
              </div>
              <i class="arrow-icon">→</i>
            </div>
            <p>New to uploading data? Click here to learn how you can provide data.</p>
          </div>
          <div class="link-item" @click="linkToGithub">
            <div class="header">
              <div class="icon-text-container">
                <img src="@/assets/github-icon.svg" alt="GitHub Icon" class="icon" />
                <span>Github</span>
              </div>
              <i class="arrow-icon">→</i>
            </div>
            <p>Integrate your application with Acartia.</p>
          </div>
          <div class="link-item" @click="linkToExportData">
            <div class="header">
              <div class="icon-text-container">
                <img src="@/assets/download-icon.svg" alt="Download Icon" class="icon" />
                <span>Export Data</span>
              </div>
              <i class="arrow-icon">→</i>
            </div>
            <p>Download Acartia sightings data here.</p>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      faqs: [
        {
          question: 'How does Acartia work?',
          answer: 'Acartia aggregates data from multiple sources and shares it through our platform.',
          open: false,
        },
        {
          question: 'Who created Acartia?',
          answer: 'Acartia was created by TypeHuman with the support of Conserve.io and other partners.',
          open: false,
        },
        {
          question: 'How does Acartia ensure the accuracy of data submissions?',
          answer: 'We employ rigorous data validation techniques to ensure the accuracy of submissions.',
          open: false,
        },
        {
          question: 'What role does Acartia play in education and outreach about marine life in the Salish Sea?',
          answer: 'Acartia plays a crucial role in educating the public about marine life conservation.',
          open: false,
        },
        {
          question: 'How can I get involved with Acartia?',
          answer: 'You can get involved by contributing data, participating in outreach programs, and more.',
          open: false,
        },
      ],
    };
  },
  methods: {
    togglePanel(index) {
      this.faqs = this.faqs.map((faq, i) => {
        return {
          ...faq,
          open: i === index ? !faq.open : faq.open,
        };
      });
    },
    linkToContributions() {
      this.$router.push('/integrate')
    },
    linkToGithub() {
      window.open('https://github.com/salish-sea/acartia', '_blank');
    },
    linkToExportData() {
      this.$router.push('/export')
    }
  },
};
</script>

<style scoped>
/* Global container for the about page */
#about-container {
  font-family: 'Montserrat', sans-serif;
  color: #545F71;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0;
}

/* Hero Section */
#hero {
  width: 100vw;
  height: 206px;
  position: relative;
  margin-left: calc(-50vw + 50%);
  left: 0;
}

#hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* About Content Section */
#about-content {
  background: #FFFFFF;
  padding: 64px 0;
  text-align: center;
}

#intro h1 {
  font-family: 'Mukta', sans-serif;
  font-size: 44px;
  font-weight: 600;
}

#intro p {
  max-width: 1080px;
  margin: 24px auto 0;
  font-size: 16px;
  line-height: 1.4;
  text-align: left;
}

/* FAQ Section */
#faq {
  margin-top: 64px;
}

#faq h2 {
  font-family: 'Mukta', sans-serif;
  font-size: 32px;
  font-weight: 600;
}

/* TODO: return to single column when time permits to fix opening bug */
.faq-items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 552px; /* Old value: 1128px */
  margin: 24px auto;
}

/* Individual FAQ item */
.faq-item {
  flex: 1 1 calc(50% - 12px);
  min-width: 250px;
  background: #FFFFFF;
  border: 1px solid #DDE1E6;
  border-radius: 5px;
}

/* FAQ question button styling */
.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #545F71;
  text-align: left;
  background: none;
  border: none;
  padding: 16px;
  cursor: pointer;
}

/* Toggle icon styling */
.toggle-icon {
  font-size: 24px;
  color: #545F71;
  transition: transform 0.3s ease;
}

.toggle-icon.active {
  transform: rotate(45deg);
}

/* FAQ answer styling */
.faq-answer {
  padding: 16px;
  font-size: 16px;
  border-top: 1px solid #DDE1E6;
}

/* Links Section */
#links {
  margin-top: 64px;
}

#links h2 {
  font-family: 'Mukta', sans-serif;
  font-size: 32px;
  font-weight: 600;
}

/* Link items container */
.link-items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 1128px;
  margin: 24px auto;
}

/* Individual link item */
.link-item {
  flex: 1 1 calc(33.333% - 24px);
  min-width: 280px;
  padding: 24px;
  background: #EEF1F4;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
}

.link-item:hover {
  background: #D4D9DE;
}

/* Link item header with icon */
.link-item .header {
  display: flex;
  justify-content: space-between;
  /* Space between icon/text and arrow */
  align-items: center;
  font-size: 24px;
  font-weight: 500;
}

/* Container for icon and text */
.link-item .header .icon-text-container {
  display: flex;
  align-items: center;
  gap: 10px;
  /* Space between icon and text */
}

/* Icon size */
.link-item .header .icon {
  width: 24px;
  height: 24px;
}

/* Arrow icon size */
.arrow-icon {
  font-size: 24px;
  margin-left: auto;
  /* Pushes the arrow to the far right */
}

@media screen and (max-width: 1080px) {
  #about-content {
    margin: 22px;
  }
}

</style>
