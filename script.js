document.addEventListener('DOMContentLoaded', () => {

  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.querySelector('.sendMessage-btn');
  const confirmation = document.getElementById('confirmation');

  if (contactForm) {

    contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email.');
      return;
    }

    const fullMessage =
`New message from your website:

Name: ${name}
Email: ${email}

Message:
${message}
`;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs.send("service_fe3beyg", "template_uw704aa", {
      message: fullMessage
    })
    .then(() => {
      confirmation.style.display = 'block';
      contactForm.reset();
      submitBtn.textContent = "Sent";

      setTimeout(() => {
        submitBtn.textContent = "Send Message";
        submitBtn.disabled = false;
        confirmation.style.display = 'none';
      }, 3000);
    })
    .catch(() => {
      alert("Failed to send message.");
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    });

    });
  }

  const projectFilter = document.getElementById('filter');
  const projectCards = document.querySelectorAll('.cards-container .card');

  if (projectFilter && projectCards.length) {
    const updateProjectView = () => {
      const showFavorites = projectFilter.checked;
      projectCards.forEach(card => {
        if (showFavorites) {
          card.style.display = card.dataset.favorite === 'true' ? '' : 'none';
        } else {
          card.style.display = '';
        }
      });
    };

    projectFilter.addEventListener('change', updateProjectView);
    updateProjectView();
  }

  // FAQ Functionality
  const faqData = [
    {
      question: "What services do you offer?",
      answer: "I offer web development, UI/UX design, SEO optimization, and ongoing maintenance for websites."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on complexity. Simple websites take 2-4 weeks, while complex projects may take 1-3 months."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, I offer maintenance packages that include updates, security checks, and small improvements to keep your site running smoothly."
    },
    {
      question: "What technologies do you use?",
      answer: "I primarily work with HTML, CSS, JavaScript, and modern frameworks. I also have experience with C# and other programming languages."
    },
    {
      question: "How do I get a quote for my project?",
      answer: "You can request a free quote by filling out the form on the Services page or contacting me directly via email."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely! I've worked with clients from various countries and am happy to collaborate remotely."
    }
  ];

  const faqContainer = document.querySelector('.faq-container');

  if (faqContainer) {
    faqData.forEach((item, index) => {
      const faqItem = document.createElement('div');
      faqItem.className = 'faq-item';

      faqItem.innerHTML = `
        <button class="faq-question" aria-expanded="false">
          <span class="question-text">${item.question}</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <div class="answer-content">${item.answer}</div>
        </div>
      `;

      faqContainer.appendChild(faqItem);

      // Add click event listener
      const questionBtn = faqItem.querySelector('.faq-question');
      const answerDiv = faqItem.querySelector('.faq-answer');
      const icon = faqItem.querySelector('.faq-icon');

      questionBtn.addEventListener('click', () => {
        const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

        // Close all other FAQ items (accordion behavior)
        document.querySelectorAll('.faq-item').forEach(otherItem => {
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');

          if (otherItem !== faqItem) {
            otherBtn.setAttribute('aria-expanded', 'false');
            otherAnswer.style.maxHeight = '0';
            otherIcon.textContent = '+';
            otherIcon.style.transform = 'rotate(0deg)';
          }
        });

        // Toggle current item
        if (isExpanded) {
          questionBtn.setAttribute('aria-expanded', 'false');
          answerDiv.style.maxHeight = '0';
          icon.textContent = '+';
          icon.style.transform = 'rotate(0deg)';
        } else {
          questionBtn.setAttribute('aria-expanded', 'true');
          answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
          icon.textContent = '−';
          icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }

});