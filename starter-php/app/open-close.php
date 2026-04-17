<?php

namespace App {
    class Payment
    {
        public function pay(string $method)
        {
            if ($method === 'card') {
                echo "Paiement par carte";
            } elseif ($method === 'paypal') {
                echo "Paiement par PayPal";
            }
        }
    }
}

namespace Change {

    class Payment
    {
        public function pay(string $method)
        {
            if ($method === 'card') {
                echo "Paiement par carte";
            } elseif ($method === 'paypal') {
                echo "Paiement par PayPal";
            } elseif ($method === 'stripe') {
                // nouvelle logique
                echo strtoupper("Paiement par Stripe");
            }
        }
    }

    /**
     * 
     * Résultat inattendu :
     * Stripe affiche en MAJUSCULES
     * comportement incohérent
     * on a introduit un bug en modifiant du code existant
     */
}

namespace Correction {
    interface PaymentMethod
    {
        public function pay(): void;
    }

    class CardPayment implements PaymentMethod
    {
        public function pay(): void
        {
            echo "Paiement par carte";
        }
    }

    class PaypalPayment implements PaymentMethod
    {
        public function pay(): void
        {
            echo "Paiement par PayPal";
        }
    }

    class Payment
    {
        public function process(PaymentMethod $method): void
        {
            $method->pay();
        }
    }

    $payment = new Payment();

    $payment->process(new CardPayment());
    $payment->process(new PaypalPayment());
}
