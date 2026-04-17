<?php

namespace App {
    class Bird
    {
        public function fly()
        {
            return "I can fly";
        }
    }

    class Penguin extends Bird
    {
        public function fly()
        {
            return "I can't fly";
        }
    }

    function letItFly(Bird $bird)
    {
        return $bird->fly();
    }

    echo letItFly(new Bird()); // "I can fly"

    // echo letItFly(new Penguin()); // "I can't fly"
}

namespace Correction {

    class Bird
    {
        // Comportement commun aux oiseaux (rien sur le vol)
    }

    interface Flyable
    {
        public function fly():string;
    }

    class Sparrow extends Bird implements Flyable
    {
        public function fly():string
        {
            return "I can fly";
        }
    }

    class Penguin extends Bird
    {
        // Pas de fly → normal
    }

    function letItFly(Flyable $bird)
    {
        return $bird->fly();
    }

    echo letItFly(new Sparrow()); //  OK
    // echo letItFly(new Penguin()); ❌ impossible → et c’est voulu
}
