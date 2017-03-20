import Ember from 'ember';
import { Scene } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';

export default Scene.extend({
  start: task(function * (script) {
    yield script.pause(500);

    this.bgmusic = script.sound('spacewolf').play().loop();
    script.layer('engine.stage').transition({ translateZ: '-1000px', translateX: '38%' }, 0).transition({ translateZ: 0, translateX: 0 }, 10000);
    this.spaceship = script.image('spaceship').position('center bottom').fadeIn();
    this.alien = script.character('alien').position('centerLeft bottom').fadeIn();

    yield script.text("You are out for a walk late at night when you stumble upon an impossible scene: an alien is busy repairing its spacecraft!");
    yield script.menu(["*<em>gasp</em>* An alien!"]);

    this.get('a').perform(script);
  }),

  a: task(function * (script) {
    const gasps = this.incrementProperty('gaspCount');

    if (gasps > 5) return this.get('angryAlien').perform(script);

    if (gasps === 1) {
      yield this.alien.pose('worried')._.text("<em>*gasp*</em> A dinosaur!");
    } else if (gasps === 2) {
      yield this.alien._.text("A dinosaur!");
    } else if (gasps === 4) {
      yield this.alien.pose('sad')._.text("Perhaps dinosaurs haven't changed overly much in the past 65mil. [[pause 500]] You're still rather [[pause 250]] reactionary.");
    } else {
      yield this.alien.pose('annoyed')._.text('<em>*glare*</em>');
    }

    const choice = yield script.menu(["*<em>gasp</em>* An alien!", "Wait. Did you just call me a dinosaur?"]);

    switch (choice.key) {
      case 0: return this.get('a').perform(script);
      default: return this.get('b1').perform(script);
    }
  }),

  b1: task(function * (script) {
    yield this.alien.pose('worried')._.text("Yes? [[pause 500]] It's really quite remarkable to see one of your kind again. [[pose sad]] [[pause 250]] I'd heard reports that you'd gone extinct.");
    const choice = yield script.menu(["Uh, I'm not a dinosaur.", "Actually, dinosaurs <em>are</em> extinct."]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('b2').perform(script);
    }
  }),

  b2: task(function * (script) {
    yield this.alien.pose('neutral')._.text("Ah, hahahahaha! [[pause 250]] I see that your kind has evolved a sense of humor. [[pause 250]] This is quite an improvement. [[pause 500]] [[pose worried]] Last time I was here, you were all about screaming and biting.");
    const choice = yield script.menu(["I'm not a dinosaur.", "That does sound a lot like humanity, tbh."]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('b3').perform(script);
    }
  }),

  b3: task(function * (script) {
    yield this.alien.pose('annoyed')._.text("Not surprising. [[pause 500]] You've developed neural tangles on top of your limbic system, but given the history of your species, it should take more than that to curb your natural territoriality and aggression.");
    const choice = yield script.menu(["I'm not a dinosaur.", "You're really into biological determinism, aren't you?"]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('b4').perform(script);
    }
  }),

  b4: task(function * (script) {
    yield this.alien.pose('annoyed')._.text("Um, of course? [[pause 500]] You aren't?");
    const choice = yield script.menu(["I fight those notions everywhere I go.", "Actually, I also believe in biological determinism."]);

    switch (choice.key) {
      case 0: return this.get('b5').perform(script);
      default: return this.get('b4b').perform(script);
    }
  }),

  b4b: task(function * (script) {
    yield this.alien.pose('neutral')._.text("Excellent! [[pause 500]] [[pose sad]] Though your kind will likely be screaming and biting for many eons to come.");
    const choice = yield script.menu(["Well, actually I'm not a dinosaur.", "Basically."]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('alienPlacated').perform(script);
    }
  }),

  b5: task(function * (script) {
    yield this.alien.pose('neutral')._.text("Ah, hahahahaha! [[pause 500]] [[pose annoyed]] You have proven yourself wrong. [[pause 250]] You see, you 'fight these notions' because it's in your biology to fight. [[pose sad]] [[pause 500]] It is your dinosaur nature.");
    const choice = yield script.menu(["I'm <em>not</em> a dinosaur.", "You know what, I'm done with this."]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('playerDone').perform(script);
    }
  }),

  c1: task(function * (script) {
    yield this.alien.pose('annoyed')._.text("No? [[pause 350]] I see it written all over your DNA, though. [[pause 350]] [[pose neutral]] You're a dinosaur.");
    const choice = yield script.menu(["I'm <em>not</em> a dinosaur.", "How exactly are you defining 'dinosaur'?"]);

    switch (choice.key) {
      case 0: return this.get('c2').perform(script);
      default: return this.get('d1').perform(script);
    }
  }),

  c2: task(function * (script) {
    yield this.alien.pose('worried')._.text("Oh, uh. [[pause 500]] This is weird. [[pause 750]] [[pose sad]] You don't realize that you're a dinosaur, do you?");
    const choice = yield script.menu(["That's actually really offensive.", "Do <em>you</em> know what a dinosaur is?"]);

    switch (choice.key) {
      case 0: return this.get('c3').perform(script);
      default: return this.get('d1').perform(script);
    }
  }),

  c3: task(function * (script) {
    yield this.alien.pose('neutral')._.text("I see your aggro-limbic systems spiking. [[pause 500]] [[pose worried]] Last time this happened with a dinosaur, it was [[pause 250]] non-optimal.");
    yield this.alien.pose('annoyed')._.text("For your own safety, do not try to eat me.");
    const choice = yield script.menu(["I'm not a dinosaur!", "I'm not going to eat you."]);

    switch (choice.key) {
      case 0: return this.get('c5').perform(script);
      default: return this.get('c4').perform(script);
    }
  }),

  c4: task(function * (script) {
    yield this.alien.pose('sad')._.text("Oh, [[pause 350]] are you an herbivore?");
    const choice = yield script.menu(["Oh, are you an idiot? How is it that you even have space technology?", "I'm not a dinosaur."]);

    switch (choice.key) {
      case 0: return this.get('angryAlien').perform(script);
      default: return this.get('c5').perform(script);
    }
  }),

  c5: task(function * (script) {
    yield this.alien.pose('annoyed')._.text("I know what a dinosaur is. [[pause 500]] Are you questioning my intellegence?");
    const choice = yield script.menu(["Yes! Really, how is it that you even have space technology?", "Actually, <em>do</em> you know what a dinosaur is?"]);

    switch (choice.key) {
      case 0: return this.get('angryAlien').perform(script);
      default: return this.get('d1').perform(script);
    }
  }),

  d1: task(function * (script) {
    yield this.alien.pose('annoyed')._.text("Dinosaurs are terrestrial, [[pause 100]] multicellular lifeforms with spinocentric nervous systems, [[pause 100]] musculoskeletal physiologies, [[pause 100]] hemoglobular oxygenation cycles, [[pause 100]] and aggro-territorial behavioral patterns. [[pause 500]] Really, it's quite obvious. [[pause 350]] [[pose distracted]] A competent paleontologist wouldn't even need to scan your DNA to know that you're a dinosaur.");
    const choice = yield script.menu(["What you're describing just sounds like a vertebrate. I'm a more specific kind of vertebrate known as a 'mammal.'", "This is ridiculous. I'm not a dinosaur, and I don't need to defend that fact any longer.", "It sounds like you have a clearly defined category to which I belong. Therefore, you're right: I am a dinosaur."]);

    switch (choice.key) {
      case 0: return this.get('d2').perform(script);
      case 1: return this.get('playerDone').perform(script);
      default: return this.get('alienPlacated').perform(script);
    }
  }),

  d2: task(function * (script) {
    yield this.alien.pose('annoyed')._.text("Oh, sorry. [[pause 350]] I didn't realize that you had local distinctions between categories of dinosaur. [[pause 350]] [[pose neutral]] Perhaps we can agree that you are a 'mammal' variant of dinosaur. [[pause 500]] [[pose distracted]] That seems like a fair compromise.");
    const choice = yield script.menu(["The way you're defining 'dinosaur' is pretty broad. That word means something far more specific to me and other people on Earth.", "There'll be no compromise: I'm not a dinosaur, and this conversation is over.", "I'm glad we were able to find a compromise. Guess that makes me a mammalian dinosaur now."]);

    switch (choice.key) {
      case 0: return this.get('d3').perform(script);
      case 1: return this.get('playerDone').perform(script);
      default: return this.get('alienPlacated').perform(script);
    }
  }),

  d3: task(function * (script) {
    yield this.alien.pose('annoyed')._.text("Yet why should we care about your definition of dinosaur? [[pause 500]] [[pose distracted]] The broader galactic community shares my definition.");
    const choice = yield script.menu(["Because we're engaged in a dialogue, and if we're going to understand each other, we'll have to understand each other's definitions.", "Because it's the definition of <em>me</em> we're talking about, and you don't even know what a fucking <em>mammal</em> is.", "Okay, fair point. If that's how everyone else uses the term, then I guess I am a dinosaur."]);

    switch (choice.key) {
      case 0: return this.get('d4').perform(script);
      case 1: return this.get('angryAlien').perform(script);
      default: return this.get('alienPlacated').perform(script);
    }
  }),

  d4: task(function * (script) {
    yield this.alien.pose('neutral')._.text("Oh, oh! [[pause 250]] Thought experiment! [[pause 350]] [[pose annoyed]] If the definition I <em>and most the galaxy</em> use is wrong, then why do you care if we call you a dinosaur?");
    const choice = yield script.menu(["Because to me a dinosaur is a giant scaled beast with no love, no reason, and no spirituality. I don't want to be confused with one.", "Because thinking of myself as a dinosaur would ultimately compel me to be more like a dinosaur myself.", "Because I know what I am, and I won't abide anyone telling me otherwise.", "Actually, being a dinosaur sounds pretty cool. I'll take it!"]);

    switch (choice.key) {
      case 3: return this.get('alienPlacated').perform(script);
      default: return this.get('d5').perform(script);
    }
  }),

  d5: task(function * (script) {
    yield this.alien.pose('distracted')._.text("I don't know if you can tell, but I am in the middle of repairing my spaceship. [[pause 500]] [[pose annoyed]] So, while I would love to help you feel better about being dinosaur, [[pose distracted]] I actually need to focus on this.");
    const choice = yield script.menu(["You know what, I've tried to be reasonable with you, but you're an asshole.", "Whatever.", "Look, just hear me out."]);

    switch (choice.key) {
      case 0: return this.get('angryAlien').perform(script);
      case 1: return this.get('playerDone').perform(script);
      default: return this.get('alienDone').perform(script);
    }
  }),

  playerDone: task(function * (script) {
    script.layer('engine.stage.foreground').transition({ translateX: '100%' }, 1000);
    yield script.text("And with that, you turn around and leave. That conversation was going nowhere.");
    this.get('again').perform(script);
  }),

  alienDone: task(function * (script) {
    yield this.alien.pose('annoyed')._.text("No.");
    this.set('rudeDeparture', true);
    this.get('alienLeaves').perform(script);
  }),

  alienPlacated: task(function * (script) {
    yield this.alien.pose('sad')._.text("You dinosaurs are more reasonable than I remember! [[pause 500]] [[pose distracted]] I actually need to leave, but it was a pleasure to see one of your kind again! [[pause 250]] Hope you're still around in another 65mil!");
    this.set('rudeDeparture', false);
    this.get('alienLeaves').perform(script);
  }),

  angryAlien: task(function * (script) {
    yield this.alien.pose('neutral')._.text("How rude! [[pause 750]] [[pose annoyed]] And here I was, trying to be civil with a dinosaur! [[pause 500]] My mistake.");
    this.set('rudeDeparture', true);
    this.get('alienLeaves').perform(script);
  }),

  alienLeaves: task(function * (script) {
    yield this.alien.fadeOut();
    yield script.text("And with that, the alien gets back into its ship and departs.");
    yield this.spaceship.transition({ translateY: '-100vh', translateX: '19%', translateZ: '100px' }, 2000);
    yield script.menu(this.get('alienDepartureChoices'));

    this.get('again').perform(script);
  }),

  again: task(function * (script) {
    yield script.pause(1000);
    const choice = yield script.menu(['Play again?', "I'm done."]);

    switch (choice.key) {
      case 0: return script.scene('main');
    }
  }),

  alienDepartureChoices: Ember.computed('rudeDeparture', {
    get() {
      if (this.get('rudeDeparture')) {
        return ["Flip off the UFO.", "Sigh.", "Just walk away."];
      } else {
        return ["Wave at the UFO.", "Shrug.", "Walk away."];
      }
    }
  })
});
