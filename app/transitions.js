export default function() {
  this.transition(
    this.hasClass('liquid-engine'),

    this.toValue(true),
    this.use('crossFade', { duration: 500 }),
    this.reverse('crossFade', { duration: 500 })
  );
}
