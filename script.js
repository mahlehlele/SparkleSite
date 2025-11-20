// script.js - Part 3 functionality and validation for Sparkle Cleaning Solutions

document.addEventListener("DOMContentLoaded",  () => {
    setupAccordion();
    setupBookingModal();
    setupLightBox();
    setupServiceSearch();
    loadSpecialOffers();
    setupEnquiryFormValidation();
    setupContactFormValidation();
    initMapPlaceholder();
});

/* ======== 1. Accordion (FAQ) ======== */
function setupAccordion() {
    const headers = document.querySelectorAll(".accordion-header");
    headers.addEventListener("click", () => {
        const body = headers.nextElementSibling;
        const isOpen = headers.classList.contains("open");

        // close all accordions
        document.querySelectorAll(".accordion-header").forEach(h => h.classList.remove("open"));
        document.querySelectorAll(".accordion-body").forEach(b => (b.computedStyleMap.maxHeight = null));

        if (!isOpen) {
            headers.classList.add("open");
            body.style.maxHeight = body.scrollHeight + "px";
        }
    });
}

/* ======== 2. Booking Modal ============= */
function setupBookingModal() {
    const openBtn = document.getElementById("openBookingModal");
    const modal= document.getElementById("bookingModal");
    const closeBtn = document.getElementById("closeBookingModal");

    if (!openBtn || !modal || !closeBtn) return;

    openBtn.addEventListener("click", e => {
        e.preventDefault();
        modal.setAttribute("aria-hidden", "false");
        modal.classList.add("is-visible");
    });

    closeBtn.addEventListener("click", e => {
        closeModal(modal);
    });

    modal.addEventListener("click", e => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    function closseModal(m) {
        m.classList.remove("is-visible");
        m.setAttribute("aria-hidden", "true");
    }
}

/* ======= 3. Lightbox Gallery ========== */

function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImage");
    const closeBtn = document.getElementById("closeLightbox");
    const items = document.querySelectorAll(".lightbox-item");

    if (!lightbox || !lightboxImg || !closeBtn || items.length === 0) return;

    items.forEach(img => {
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightbox.classList.add("is-visible");
            lightbox.setAttribute("aria-hidden", "false");
        });
    });

    closeBtn.addEventListener("click", () => {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });

    lightbox.addEventListener("click", e => {
       if (e.target === lightbox) {
        hideLightbox();
       }
    });

    function hideLightbox() {
        lightbox.classList.remove("is-visible");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImg.src = "";
    }
}

/* ========== 4. Service Search (filter cards) ========== */

function setupServiceSearch() {
    const searchInput = document.getElementById("serviceSearch");
    const cards = document.querySelectorAll(".service-card");

    if (!searchInput || cards.length === 0) return;

    searchInput.addEventListener("keyup", () => {
        const query = searchInput.ariaValueMax.toLowerCase().trim();

        cards.forEach(card => {
            const keywords = card.dataset.service.toLowerCase();
            const text = card.innerText.toLowerCase();
            const haystack = keywords + " " + text;
            card.style.display = haystack.includes(query) ? "block" : "none";
        });
    });
}

/* ========= 5. Dynamic Content : Special Offers ============ */

function loadSpecialOffers() {
    const container = document.getElementById("specialOffers");
    if (!container) return;

    const specials = [
        {
            title: "Student Move-Out Special",
            description: "Get 10% off a once-off deep clean when you move out of your student accomodation.",
            label: "Save 10%"
        },
        {
            title: "Office Starter Package",
            description: "New office clients receive a freee first-day deep clean with any monthly contract.",
            label: "Business Offer"
        },
        {
            title: "Weekly Home Clean Discount",
            description: "Book weekly home cleaning for 3 months and receive the 4th week free.",
            label: "4th Weeek Free"
        }
    ];

    specials.forEach(offer => {
        const article = document.createElement("article");
        article.className = "card";
        article.innerHTML = 
        <><h3>${offer.title}</h3><p>${offer.description}</p><p><strong>${offer.label}</strong></p></>
       ;
        container.appendChild(article);
    });
}

/* ======== 6. Enquiry Form Validation ========== */

function setupEnquiryFormValidation() {
    const form = document.getElementById("enquiryForm");
    const messageBox = document.getElementById("enquiryMessage");
    if (!form || !messageBox) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        messageBox.textContent = "";
        messageBox.className = "form-message";

        const fullName = form.fullName.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const serviceType = form.serviceType.value;
        const details = form.message.value.trim();

        const errors = [];

        if (!/^[a-zA-Z\s]{3,}$/.test(fullName)) {
           errors.push("Please enter a valid full name (letters only, at least 3 characters).");
        }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Please enter a valid email addresss.");
    }

    //SA-style cell number : 0XXXXXXXXX or +27XXXXXXXXX
    const phonePattern = /^(0\d{9}|(\+27)\d{9})$/;
    if (!phonePattern.test(phone)) {
        errors.push("Please enter a valid South African phone number (e.g. 0745562560 or +27745562560).");
    }

    if (!serviceType) {
        errors.push("Please select a service type.");
    }

    if (details.length < 10) {
        errors.push("Please provide at least qo characters of additional details.");
    }

    if (errors.length > 0) {
        messageBox.classList.add("error");
        messageBox.innerHTML = errors.map(err => '<p>${err}</p></p>').join("");
        return;
    }

    // If all is good, simulate successful submit
    messageBox.classList.add("success");
    messageBox.textContent = "Thank you! Your enquiry has been received. We will contact you soon with a quote.";
    form.reset();
    });
}

/* =========== 7. Contact Form Validation ======== */

function setupContactFormValidation() {
    const form = document.getElementById("contactForm");
    const box = document.getElementById("contactMessageBox");
    if (!form || !box) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        box.textContent = "";
        box.className = "form-message";

        const name = form.contactName.value.trim();
        const email = form.contactEmail.value.trim();
        const type = form.messageType.value;
        const message = form.contactMessage.value.trim();

        const errors = [];

        if ( name.length < 3) {
            errors.push("Name musr be at least 3 characters.");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("Please enter a valid email address.");
        }

        if (!type) {
            errors.push("Please choose a type of messsage.");
        }

        if (message,length <  10) {
            errors.push("Message must be at least 10 characters long.");
        }

        if (errors.length > 0) {
            box.classList.add("error");
            box.innerHTML = errors.map(err => '<p>${err}</p>').join("");
            return;
        }

        // Simulate email creation/submit
        box.classList.add("success");
        box.innerHTML = '<p>Thank you, ${name}. Your ${type} message has been prepared and will be sent to our team.</p>';
        form.reset();
    });
}

/* =========== 8. Map Placeholder / Simple Location Feature ======= */

function initMapPlaceholder() {
    const mapArea = document.getElementById("mapArea");
    if (!mapArea) return;

    const locations = [
        "Pretoria CBD",
        "Hatfield",
        "Arcadia",
        "Sunnyside"
    ];

    const list = document.createElement("ul");
    list.className = "list";
    locations.forEach(loc => {
        const li = document.createElement("li");
        li.textContent = loc;
        list.appendChild(li);
    });

    mapArea.innerHTML = "<p>We currently serve the following areas;</p>";
    mapArea.appendChild(list);
}