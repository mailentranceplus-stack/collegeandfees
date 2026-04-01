const testimonials = [
  {
    text: "We were completely lost after my son got 45,000 rank in KCET. The team here explained everything about management quota clearly and helped us get a CSE seat at RVCE. No false promises.",
    name: "Ramesh K.",
    meta: "Parent of RVCE CSE student, 2025",
    initials: "RK",
  },
  {
    text: "I was worried about hidden fees and agents who mislead. CollegeAndFees showed us the exact fee structure upfront. My daughter is now at Christ University studying ECE.",
    name: "Sunitha Rao",
    meta: "Parent of Christ University student, 2025",
    initials: "SR",
  },
  {
    text: "The WhatsApp support was fast and honest. They told us exactly what documents to keep ready and guided us through the entire process step by step.",
    name: "Vikram S.",
    meta: "Student, RVCE CSE, 2025",
    initials: "VS",
  },
];

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <div className="badge">Student Stories</div>
        <h2 className="section-title">What Families Say</h2>
        <p className="section-subtitle">
          Real experiences from students and parents we have helped with management quota admissions in Bangalore.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-meta">{t.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
