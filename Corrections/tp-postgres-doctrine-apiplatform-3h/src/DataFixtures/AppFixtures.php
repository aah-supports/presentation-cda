<?php

namespace App\DataFixtures;

use App\Entity\Casting;
use App\Entity\Genre;
use App\Entity\Movie;
use App\Entity\Person;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $genres = $this->loadGenres($manager);
        $people = $this->loadPeople($manager);
        $movies = $this->loadMovies($manager, $genres);
        $this->loadCastings($manager, $movies, $people);

        $manager->flush();
    }

    /** @return array<string, Genre> */
    private function loadGenres(ObjectManager $manager): array
    {
        $rows = [
            ['code' => 'SF', 'label' => 'Science-Fiction'],
            ['code' => 'THR', 'label' => 'Thriller'],
            ['code' => 'DRM', 'label' => 'Drame'],
            ['code' => 'ACT', 'label' => 'Action'],
        ];

        $genres = [];

        foreach ($rows as $row) {
            $genre = (new Genre())
                ->setCode($row['code'])
                ->setLabel($row['label']);

            $manager->persist($genre);
            $genres[$row['code']] = $genre;
        }

        return $genres;
    }

    /** @return array<string, Person> */
    private function loadPeople(ObjectManager $manager): array
    {
        $rows = [
            ['fullName' => 'Christopher Nolan', 'birthDate' => '1970-07-30'],
            ['fullName' => 'Leonardo DiCaprio', 'birthDate' => '1974-11-11'],
            ['fullName' => 'Hans Zimmer', 'birthDate' => '1957-09-12'],
            ['fullName' => 'Greta Gerwig', 'birthDate' => '1983-08-04'],
            ['fullName' => 'Saoirse Ronan', 'birthDate' => '1994-04-12'],
        ];

        $people = [];

        foreach ($rows as $row) {
            $person = (new Person())
                ->setFullName($row['fullName'])
                ->setBirthDate(new DateTimeImmutable($row['birthDate']));

            $manager->persist($person);
            $people[$row['fullName']] = $person;
        }

        return $people;
    }

    /** @param array<string, Genre> $genres
     *  @return array<string, Movie>
     */
    private function loadMovies(ObjectManager $manager, array $genres): array
    {
        $rows = [
            [
                'title' => 'Inception',
                'slug' => 'inception',
                'releaseYear' => 2010,
                'durationMinutes' => 148,
                'genres' => ['SF', 'THR'],
            ],
            [
                'title' => 'Lady Bird',
                'slug' => 'lady-bird',
                'releaseYear' => 2017,
                'durationMinutes' => 94,
                'genres' => ['DRM'],
            ],
        ];

        $movies = [];

        foreach ($rows as $row) {
            $movie = (new Movie())
                ->setTitle($row['title'])
                ->setSlug($row['slug'])
                ->setReleaseYear($row['releaseYear'])
                ->setDurationMinutes($row['durationMinutes']);

            foreach ($row['genres'] as $genreCode) {
                $movie->addGenre($genres[$genreCode]);
            }

            $manager->persist($movie);
            $movies[$row['slug']] = $movie;
        }

        return $movies;
    }

    /** @param array<string, Movie> $movies
     *  @param array<string, Person> $people
     */
    private function loadCastings(ObjectManager $manager, array $movies, array $people): void
    {
        $rows = [
            [
                'movie' => 'inception',
                'person' => 'Leonardo DiCaprio',
                'role' => 'Cobb',
                'billingOrder' => 1,
            ],
            [
                'movie' => 'inception',
                'person' => 'Hans Zimmer',
                'role' => 'Composer',
                'billingOrder' => 2,
            ],
            [
                'movie' => 'lady-bird',
                'person' => 'Saoirse Ronan',
                'role' => 'Christine',
                'billingOrder' => 1,
            ],
            [
                'movie' => 'lady-bird',
                'person' => 'Greta Gerwig',
                'role' => 'Director',
                'billingOrder' => 2,
            ],
        ];

        foreach ($rows as $row) {
            $casting = (new Casting())
                ->setMovie($movies[$row['movie']])
                ->setPerson($people[$row['person']])
                ->setRoleName($row['role'])
                ->setBillingOrder($row['billingOrder']);

            $manager->persist($casting);
        }
    }
}
