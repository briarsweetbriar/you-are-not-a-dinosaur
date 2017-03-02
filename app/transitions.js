export default function() {
  this.transition(
    this.hasClass('liquid-engine'),

    this.toValue(true),
    this.use('crossFade', { duration: 1000 }),
    this.reverse('crossFade', { duration: 1000 })
  );
}
