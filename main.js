(function(){
    const btn =
document.getElementById('navToggle');
    const nav =
document.getElementById('primaryNav');
    if(btn && nav){
        btn.addEventListener('click', () => {
            const  open= nav.classList.toggle('open');
            btn.setAttributeNS('aria-expanded', String(open));
        });
    }
})

// Simple client-side validation for enquiry form
const form = document.getElementById('enquiryForm');
if(form){
    form.addEventListener('submit', (e) => {
        let valid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const service = document.getElementById('service');
        const date= document.getElementById('date');

        const setErr = (id, msg) =>
        { const el=document.getElementById(id); if(el) el.textContent = msg; };
        setErr('err-name', '');
    setErr('err-email','');
    setErr('err-service','');
    setErr('err-date','');

    if(!name.value.trim()) {
        setErr('err-name','Please enter your full name.'); valid=false;
    }

    if(!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){ setErr('err-email','Enter a valid emaail.'); valid=false; }
    if(!service.value) { setErr('err-service','Select a service.'); valid=false; }
    if(!date.value) { setErr('err-date','Choose a preferred date.'); valid=false; }

    if(!valid){ e.preventDefault(); }
    else {
        alert('Thank you! Your enquiry has been recorded.');
    }
    });
}