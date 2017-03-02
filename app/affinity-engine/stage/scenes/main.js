import { Scene } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';

export default Scene.extend({
  start: task(function * (script) {
    yield script.pause(500);

    this.bgmusic = script.sound('spacewolf').play().loop();
    this.alien = script.character('alien');
    yield script.text("You are out for a walk late at night when you stumble upon an impossible scene: an alien is busy repairing its spacecraft!");
    yield script.menu(["*gasp* An alien!"]);

    this.get('a').perform(script);
  }),

  a: task(function * (script) {
    const gasps = this.incrementProperty('gaspCount');

    if (gasps > 5) return this.get('angryAlien').perform(script);

    yield this.alien._.text(gasps < 3 ? "*gasp* A dinosaur!" : gasps === 4 ? "Yes, I'm an alien. Can we get on with it?" : "*silence*");
    const choice = yield script.menu(["*gasp* An alien!", "Wait. Did you just call me a dinosaur?"]);

    switch (choice.key) {
      case 0: return this.get('a').perform(script);
      default: return this.get('b1').perform(script);
    }
  }),

  b1: task(function * (script) {
    yield this.alien._.text("Yes? [[#pause 500]] It's really quite remarkable to see one of your kind again. I'd heard reports that you'd gone extinct.");
    const choice = yield script.menu(["Uh, I'm not a dinosaur.", "Actually, dinosaurs are extinct."]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('b2').perform(script);
    }
  }),

  b2: task(function * (script) {
    yield this.alien._.text("Ah, hahahahaha! I see that your kind has evolved a sense of humor. This is quite an improvement. Last time I was here, you were all about screaming and biting.");
    const choice = yield script.menu(["I'm not a dinosaur.", "That does sound a lot like humanity, tbh."]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('b3').perform(script);
    }
  }),

  b3: task(function * (script) {
    yield this.alien._.text("You mean you're still into screaming and biting? Well, I guess that isn't surprising. A quick magno-resonant scan shows that you've developed some neural tangles on top of your limbic system, but given the history of your species, I imagine it'll take more than that to curb your natural territoriality and aggression.");
    const choice = yield script.menu(["I'm not a dinosaur.", "You're really into biological determinism, aren't you?"]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('b4').perform(script);
    }
  }),

  b4: task(function * (script) {
    yield this.alien._.text("Um, of course? You aren't?");
    const choice = yield script.menu(["I fight those notions all the time here on Earth, and now it looks like I've got to fight them from outerspace, too.", "Actually, I agree with you. People can't fight their nature, and this is exactly why we're so fucked up. We're dinosaurs."]);

    switch (choice.key) {
      case 0: return this.get('b5').perform(script);
      default: return this.get('alienPlacated').perform(script);
    }
  }),

  b5: task(function * (script) {
    yield this.alien._.text("You see, this is what I'm getting at. You have to 'fight these notions' because it's in your biology to fight. You're a dinosaur.");
    const choice = yield script.menu(["I'm not a dinosaur.", "You know what, I'm done with this."]);

    switch (choice.key) {
      case 0: return this.get('c1').perform(script);
      default: return this.get('playerDone').perform(script);
    }
  }),

  c1: task(function * (script) {
    yield this.alien._.text("No? I see it written all over your DNA, though. You're a dinosaur.");
    const choice = yield script.menu(["I'm not a dinosaur.", "How exactly are you defining 'dinosaur'?"]);

    switch (choice.key) {
      case 0: return this.get('c2').perform(script);
      default: return this.get('d1').perform(script);
    }
  }),

  c2: task(function * (script) {
    yield this.alien._.text("Oh, uh. [[pause 500]] This is weird. [[pause 750]] You don't realize that you're a dinosaur, do you?");
    const choice = yield script.menu(["That's actually really offensive.", "Do you know what a dinosaur is?"]);

    switch (choice.key) {
      case 0: return this.get('c3').perform(script);
      default: return this.get('d1').perform(script);
    }
  }),

  c3: task(function * (script) {
    yield this.alien._.text("Uh, are you about to enter a dino-rage? If you are, just know that I'm armed. I'll fight back if you try to eat me.");
    const choice = yield script.menu(["I'm not a dinosaur!", "I'm not going to eat you."]);

    switch (choice.key) {
      case 0: return this.get('c5').perform(script);
      default: return this.get('c4').perform(script);
    }
  }),

  c4: task(function * (script) {
    yield this.alien._.text("Oh, are you an herbivore?");
    const choice = yield script.menu(["Oh, are you an idiot? How is it that you even have space technology?", "I'm not a dinosaur."]);

    switch (choice.key) {
      case 0: return this.get('angryAlien').perform(script);
      default: return this.get('c5').perform(script);
    }
  }),

  c5: task(function * (script) {
    yield this.alien._.text("Look, I know what a dinosaur is. What do you take me for?");
    const choice = yield script.menu(["An idiot? How is it that you even have space technology?", "Actually, do you know what a dinosaur is?"]);

    switch (choice.key) {
      case 0: return this.get('angryAlien').perform(script);
      default: return this.get('d1').perform(script);
    }
  }),

  d1: task(function * (script) {
    yield this.alien._.text("Dinosaurs are terrestrial, multicellular lifeforms with spinocentric nervous systems, musculoskeletal physiologies, hemoglobular oxygenation cycles, and aggro-territorial behavioral patterns. Really, it's quite obvious. A competent paleontologist wouldn't even need to scan your DNA to know that you're a dinosaur.");
    const choice = yield script.menu(["What you're describing just sounds like a vertebrate. I'm a more specific kind of vertebrate known as a 'mammal.'", "This is ridiculous. I'm not a dinosaur, and I don't need to defend that fact any longer.", "I'm an adherent of scientific categorization, and it sounds like you have a clearly defined category to which I belong. Therefore, you're right: I am a dinosaur."]);

    switch (choice.key) {
      case 0: return this.get('d2').perform(script);
      case 1: return this.get('playerDone').perform(script);
      default: return this.get('alienPlacated').perform(script);
    }
  }),

  d2: task(function * (script) {
    yield this.alien._.text("Oh, sorry. I didn't realize that you had local distinctions between categories of dinosaur. Well, yes. Perhaps we can agree that you are a 'mammal' variant of dinosaur. That seems like a fair compromise.");
    const choice = yield script.menu(["The way you're defining 'dinosaur' is pretty broad. That word means something far more specific to me and other people on Earth.", "There'll be no compromise: I'm not a dinosaur, and this conversation is over.", "I'm glad we were able to find a compromise. Guess that makes me a mammalian dinosaur now."]);

    switch (choice.key) {
      case 0: return this.get('d3').perform(script);
      case 1: return this.get('playerDone').perform(script);
      default: return this.get('alienPlacated').perform(script);
    }
  }),

  d3: task(function * (script) {
    yield this.alien._.text("Yet why should we care about your definition of dinosaur? The broader galactic community shares my definition.");
    const choice = yield script.menu(["Because we're engaged in a dialogue, and if we're going to understand each other, we'll have to understand each other's definitions.", "Because it's the definition of me we're talking about, and you don't even know what the hell a dinosaur is, much less a human or a mammal.", "Okay, fair point. If that's how everyone else uses the term, then I guess I am a dinosaur."]);

    switch (choice.key) {
      case 0: return this.get('d4').perform(script);
      case 1: return this.get('angryAlien').perform(script);
      default: return this.get('alienPlacated').perform(script);
    }
  }),

  d4: task(function * (script) {
    yield this.alien._.text("I just don't get why you care so much. So what if I call you a dinosaur? It's not going to change your DNA to just agree with me (and most the galaxy).");
    const choice = yield script.menu(["Because to me a dinosaur is a giant scaled beast with no love, no reason, and no spirituality. Humans are so much more than that.", "Because thinking of myself as a dinosaur would ultimately compel me to be more like a dinosaur myself.", "Because I know what I am, and I won't abide anyone telling me otherwise.", "Actually, being a dinosaur sounds pretty cool. I'll take it!"]);

    switch (choice.key) {
      case 3: return this.get('alienPlacated').perform(script);
      default: return this.get('d5').perform(script);
    }
  }),

  d5: task(function * (script) {
    yield this.alien._.text("Alright, I realize now that this will take a lot of time, and while I'd love to help you feel better about being a dinosaur, I've actually gotta get going.");
    const choice = yield script.menu(["You know what, I've tried to be reasonable with you, but you're an asshole.", "Okay, I'm done with this conversation.", "Look, just hear me out."]);

    switch (choice.key) {
      case 0: return this.get('angryAlien').perform(script);
      case 1: return this.get('playerDone').perform(script);
      default: return this.get('alienDone').perform(script);
    }
  }),

  playerDone: task(function * (script) {
    yield script.text("And with that, you turn around and leave. That conversation was going nowhere.");
    this.get('again').perform(script);
  }),

  alienDone: task(function * (script) {
    yield this.alien._.text("Nope.");
    yield script.text("And with that, the alien gets back into its ship and departs.");
    this.get('again').perform(script);
  }),

  alienPlacated: task(function * (script) {
    yield this.alien._.text("I'm glad we came to an understanding! I've actually gotta get going, but it was great to see a dinosaur again! Hope you're still around in another 65mil!");
    yield script.text("And with that, the alien gets back into its ship and departs.");
    this.get('again').perform(script);
  }),

  angryAlien: task(function * (script) {
    yield this.alien._.text("How rude! And here I was, trying so hard to be civil with a stupid dinosaur.");
    yield script.text("And with that, the alien gets back into its ship and departs.");
    const choice = yield script.menu(["Flip off the UFO.", "Sigh in relief.", "Shrug."]);
    this.get('again').perform(script);
  }),

  again: task(function * (script) {
    yield script.pause(1000);
    const choice = yield script.menu(['Play again?', "I'm done."]);

    switch (choice.key) {
      case 0: return script.scene('main');
    }
  })
});
