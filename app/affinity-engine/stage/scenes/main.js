import Ember from 'ember';
import { Scene } from 'affinity-engine-stage';
import { task, timeout } from 'ember-concurrency';

export default Scene.extend({
  start: task(function * (script) {
    yield script.pause(500);

    this.bgmusic = script.sound('spacewolf').play().loop();
    this.stars = script.backdrop('stars');
    this.ground = script.backdrop('ground');
    this.spaceship = script.image('spaceship').transition({ bottom: 0, left: '50%', translateX: '-50%', '@media (max-width: 500px)': { left: 0, translateX: '-5%' } }, 0);
    this.martian = yield script.character('martian').transition({ bottom: 0 }, 100);
    script.layer('engine.stage').transition({ opacity: 0 }, 0);
    yield this.martian.transition({ bottom: 0, left: '50%', translateX: '-100%', '@media (max-width: 500px)': { bottom: '-1%', left: 0, translateX: '-30%' } }, 0);
    this.stars.transition({ scaleX: 0.98, scaleY: 0.98, translateY: '0.1vh', translateX: '0.1vw' }, 0);
    this.ground.transition({ scaleX: 0.65, scaleY: 0.65, translateX: '0.5vw', translateY: '20vh' }, 0);
    script.layer('engine.stage.foreground').transition({ scaleX: 0.37, scaleY: 0.37, translateX: '1%', translateY: '15%' }, 0);
    this.martian.fadeIn();
    this.stars.fadeIn();
    this.ground.fadeIn();
    this.spaceship.fadeIn();

    script.layer('engine.stage').transition({ opacity: 1 }, 3000);

    yield script.text("You are out for a walk when you stumble upon an impossible scene: a martian is busy repairing its spacecraft!");
    yield script.menu(["*<em>gasp</em>* A martian!"]);

    this.get('a').perform(script);
  }),

  a: task(function * (script) {
    const gasps = this.incrementProperty('gaspCount');

    if (gasps > 5) return this.get('angryMartian').perform(script);

    if (gasps === 1) {
      yield this.martian.pose('worried')._.text("<em>*gasp*</em> A dinosaur!");
    } else if (gasps === 2) {
      yield this.martian._.text("A dinosaur!");
    } else if (gasps === 4) {
      yield this.martian.pose('sad')._.text("Perhaps dinosaurs haven't changed overly much in the past 65mil. [[pause 500]] You're still rather [[pause 250]] reactionary.");
    } else {
      yield this.martian.pose('annoyed')._.text('<em>*glare*</em>');
    }

    const choice = yield script.menu(["*<em>gasp</em>* A martian!", "Wait. Did you just call me a dinosaur?"]);

    switch (choice.key) {
      case 0: return this.get('a').perform(script);
      default: return this.get('b1').perform(script);
    }
  }),

  b1: task(function * (script) {
    this.stars.transition({ scaleX: 1, scaleY: 1, translateX: 0, translateY: 0 }, 10000, { easing: 'easeInOut' });
    this.ground.transition({ scaleX: 1, scaleY: 1, translateX: 0, translateY: '60vh' }, 10000, { easing: 'easeInOut' });
    script.layer('engine.stage.foreground').transition({ scaleX: 1, scaleY: 1, translateX: 0, translateY: 0 }, 10000, { easing: 'easeInOut' });
    yield this.martian.pose('worried')._.text("Yes? [[pause 500]] It's really quite remarkable to see one of your kind again. [[pose sad]] [[pause 250]] I'd heard reports that you'd gone extinct.");
    const choice = yield script.menu(["Uh, I'm not a dinosaur.", "Actually, dinosaurs <em>are</em> extinct."]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('b2').perform(script);
    }
  }),

  b2: task(function * (script) {
    yield this.martian.pose('neutral')._.text("Ah, hahahahaha! [[pause 250]] I see that your kind has evolved a sense of humor. [[pause 250]] This is quite an improvement. [[pause 500]] [[pose worried]] Last time I was here, you were all about screaming and biting.");
    const choice = yield script.menu(["I'm not a dinosaur.", "That does sound a lot like humanity, tbh."]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('b3').perform(script);
    }
  }),

  b3: task(function * (script) {
    yield this.martian.pose('annoyed')._.text("Not surprising. [[pause 500]] I see that you've developed neural tangles on top of your limbic system, but I remember your species well. It would take more than some inhibitory neurons to curb your excessive territoriality and aggression.");
    const choice = yield script.menu(["I'm not a dinosaur.", "You're really into biological determinism, aren't you?"]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('b4').perform(script);
    }
  }),

  b4: task(function * (script) {
    yield this.martian.pose('annoyed')._.text("Yes. [[pause 500]] You aren't?");
    const choice = yield script.menu(["I fight those notions everywhere I go.", "Actually, I also believe in biological determinism."]);

    switch (choice.key) {
      case 0: return this.get('b5').perform(script);
      default: return this.get('b4b').perform(script);
    }
  }),

  b4b: task(function * (script) {
    yield this.martian.pose('neutral')._.text("Excellent! [[pause 500]] [[pose sad]] At least you now have enough sense to realize that you'll be screaming and biting for eons to come.");
    const choice = yield script.menu(["Well, actually I'm not a dinosaur.", "Basically."]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('martianPlacated').perform(script);
    }
  }),

  b5: task(function * (script) {
    yield this.martian.pose('neutral')._.text("Ah, hahahahaha! [[pause 500]] [[pose annoyed]] You have proven yourself wrong. [[pause 250]] You see, you 'fight these notions' because it's in your dinosaur biology to fight.");
    const choice = yield script.menu(["I'm <em>not</em> a dinosaur.", "You know what, I'm done with this."]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('playerDone').perform(script);
    }
  }),

  c1: task(function * (script) {
    yield this.martian.pose('annoyed')._.text("No? [[pause 350]] I see it written all over your DNA, though. [[pause 350]] [[pose neutral]] You're a dinosaur.");
    const choice = yield script.menu(["Listen to me. I'm <em>not</em> a dinosaur.", "How exactly are you defining 'dinosaur'?"]);

    switch (choice.key) {
      case 0: return this.get('c2').perform(script);
      default: return this.get('d1').perform(script);
    }
  }),

  c2: task(function * (script) {
    yield this.martian.pose('worried')._.text("Oh, uh. [[pause 500]] This is awkward. [[pause 750]] [[pose sad]] You don't realize that you're a dinosaur, do you?");
    const choice = yield script.menu(["That's actually really offensive.", "Do <em>you</em> know what a dinosaur is?"]);

    switch (choice.key) {
      case 0: return this.get('c3').perform(script);
      default: return this.get('d1').perform(script);
    }
  }),

  c3: task(function * (script) {
    yield this.martian.pose('neutral')._.text("I see your aggro-limbic systems spiking. [[pause 500]] [[pose worried]] Last time this happened with a dinosaur, it was [[pause 350]] non-optimal.");
    yield this.martian.pose('annoyed')._.text("For your own safety, do not try to eat me.");
    const choice = yield script.menu(["I'm not a dinosaur!", "I'm not going to eat you."]);

    switch (choice.key) {
      case 0: return this.get('c5').perform(script);
      default: return this.get('c4').perform(script);
    }
  }),

  c4: task(function * (script) {
    yield this.martian.pose('sad')._.text("Oh, [[pause 350]] are you an herbivore?");
    const choice = yield script.menu(["Are you an idiot? How is it that you even have space technology?", "I'm not a dinosaur."]);

    switch (choice.key) {
      case 0: return this.get('angryMartian').perform(script);
      default: return this.get('c5').perform(script);
    }
  }),

  c5: task(function * (script) {
    yield this.martian.pose('annoyed')._.text("I know what a dinosaur is. [[pause 500]] Are you questioning my intellegence?");
    const choice = yield script.menu(["Yes! Really, how is it that you even have space technology?", "Actually, <em>do</em> you know what a dinosaur is?"]);

    switch (choice.key) {
      case 0: return this.get('angryMartian').perform(script);
      default: return this.get('d1').perform(script);
    }
  }),

  d1: task(function * (script) {
    yield this.martian.pose('annoyed')._.text("Dinosaurs are terrestrial, [[pause 100]] multicellular lifeforms with spinocentric nervous systems, [[pause 100]] musculoskeletal physiologies, [[pause 100]] hemoglobular oxygenation cycles, [[pause 100]] and aggro-territorial behavioral patterns. [[pause 500]] Really, it's quite obvious. [[pause 350]] [[pose distracted]] A competent paleontologist wouldn't even need to scan your DNA to know that you're a dinosaur.");
    const choice = yield script.menu(["I might share some traits with a dinosaur, but that doesn't make me one. I'm technically a mammal.", "I guess you're the expert here. So that makes me a dinosaur, huh?", "You're clearly not going to hear me out. I'm done with this."]);

    switch (choice.key) {
      case 0: return this.get('d2').perform(script);
      case 1: return this.get('martianPlacated').perform(script);
      default: return this.get('playerDone').perform(script);
    }
  }),

  d2: task(function * (script) {
    yield this.martian.pose('annoyed')._.text("Oh, sorry. [[pause 350]] I didn't realize that you had local distinctions between categories of dinosaur. [[pause 350]] [[pose neutral]] Perhaps we can agree that you are a 'mammal' variant of dinosaur. [[pause 500]] [[pose distracted]] That seems like a fair compromise.");
    const choice = yield script.menu(["The way you're defining 'dinosaur' is pretty broad. That word means something far more specific to me and other people on Earth.", "Yeah, I guess compromise is good. So that makes me a mammalian dinosaur, huh?", "You're clearly not going to hear me out. I'm done with this."]);

    switch (choice.key) {
      case 0: return this.get('d3').perform(script);
      case 1: return this.get('martianPlacated').perform(script);
      default: return this.get('playerDone').perform(script);
    }
  }),

  d3: task(function * (script) {
    yield this.martian.pose('annoyed')._.text("Yet why should we care about your definition of dinosaur? [[pause 500]] [[pose distracted]] The broader galactic community shares my definition.");
    const choice = yield script.menu(["Because we're engaged in a dialogue, and if we're going to understand each other, we'll have to understand each other's definitions.", "I guess you're right. If everyone uses the term that way, then that's what it means. I'm a dinosaur.", "Because it's the definition of <em>me</em> we're talking about, and you don't even know what a fucking <em>mammal</em> is."]);

    switch (choice.key) {
      case 0: return this.get('d4').perform(script);
      case 1: return this.get('martianPlacated').perform(script);
      default: return this.get('angryMartian').perform(script);
    }
  }),

  d4: task(function * (script) {
    yield this.martian.pose('neutral')._.text("Oh, oh! [[pause 250]] Thought experiment! [[pause 350]] [[pose annoyed]] If the definition I <em>and most the galaxy</em> use is wrong, then why do you care if we call you a dinosaur?");
    const choice = yield script.menu(["Because to me a dinosaur is a giant scaled beast with no love, no reason, and no spirituality. I don't want to be confused with one.", "Because thinking of myself as a dinosaur would ultimately compel me to be more like a dinosaur myself.", "Because I know what I am, and I won't abide anyone telling me otherwise.", "Ever consider if you're a dinosaur? I mean, look at the aggro-territorial behavioral patterns you're demonstrating."]);

    switch (choice.key) {
      case 3: return this.get('angryMartian').perform(script);
      default: return this.get('d5').perform(script);
    }
  }),

  d5: task(function * (script) {
    yield this.martian.pose('distracted')._.text("I don't know if you can tell, but I am in the middle of repairing my spaceship. [[pause 500]] [[pose annoyed]] So, while I would love to help you feel better, [[pose distracted]] I actually need to focus on this.");
    const choice = yield script.menu(["You know what, I've tried to be reasonable with you, but you're an asshole.", "You wouldn't hear me out, anyway. I'm done with this.", "Look, just hear me out."]);

    switch (choice.key) {
      case 0: return this.get('angryMartian').perform(script);
      case 1: return this.get('playerDone').perform(script);
      default: return this.get('martianDone').perform(script);
    }
  }),

  playerDone: task(function * (script) {
    script.layer('engine.stage.foreground').transition({ translateX: '150%', translateZ: '50px' }, 2500, { easing: 'easeInSine' });
    script.layer('engine.stage.background').transition({ translateX: '100%', translateZ: '250px', opacity: 0 }, 15000, { easing: 'easeInOutSine' });
    yield script.text("And with that, you turn around and leave. That conversation was going nowhere.");
    this.get('again').perform(script);
  }),

  martianDone: task(function * (script) {
    yield this.martian.pose('annoyed')._.text("No.");
    this.set('rudeDeparture', true);
    this.get('martianLeaves').perform(script);
  }),

  martianPlacated: task(function * (script) {
    yield this.martian.pose('neutral')._.text("Of course! That's what I've been saying this whole time. [[pause 500]] [[pose distracted]] Anyway, I need to be on my way. [[pause 250]] Hope your kind is still around in another 65mil!");
    this.set('rudeDeparture', false);
    this.get('martianLeaves').perform(script);
  }),

  angryMartian: task(function * (script) {
    yield this.martian.pose('neutral')._.text("How rude! [[pause 750]] [[pose annoyed]] And here I was, trying to be civil with a dinosaur! [[pause 500]] My mistake.");
    this.set('rudeDeparture', true);
    this.get('martianLeaves').perform(script);
  }),

  martianLeaves: task(function * (script) {
    this.martian.delay(500).fadeOut(1000);
    yield script.text("The martian makes a few final modifications before getting back into its ship to leave.");
    this.spaceship.transition({ translateY: '-100vh', translateX: '19%', translateZ: '100px' }, 2000);
    yield script.menu(this.get('martianDepartureChoices'));

    this.get('again').perform(script);
  }),

  again: task(function * (script) {
    script.layer('engine.stage.background').transition({ opacity: 0 }, 1500);
    yield script.pause(1000);
    const choice = yield script.menu(['Play again?']);

    switch (choice.key) {
      case 0: return script.scene('main');
    }
  }),

  martianDepartureChoices: Ember.computed('rudeDeparture', {
    get() {
      if (this.get('rudeDeparture')) {
        return ["Flip off the UFO.", "Shrug.", "Tweet about it."];
      } else {
        return ["*<em>sigh</em>*"];
      }
    }
  })
});
