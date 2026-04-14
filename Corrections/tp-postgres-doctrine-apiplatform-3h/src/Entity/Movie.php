<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'movie')]
#[UniqueEntity(fields: ['slug'])]
#[ApiResource]
class Movie
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    private Uuid $id;

    #[ApiProperty(example: 'Inception')]
    #[Assert\NotBlank]
    #[Assert\Length(max: 150)]
    #[ORM\Column(length: 150)]
    private string $title;

    #[ApiProperty(example: 'inception')]
    #[Assert\NotBlank]
    #[Assert\Length(max: 180)]
    #[ORM\Column(length: 180, unique: true)]
    private string $slug;

    #[ApiProperty(example: 2010)]
    #[Assert\GreaterThanOrEqual(1888)]
    #[ORM\Column(type: 'smallint')]
    private int $releaseYear;

    #[ApiProperty(example: 148)]
    #[Assert\Positive]
    #[ORM\Column(type: 'smallint')]
    private int $durationMinutes;

    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    /** @var Collection<int, Genre> */
    #[ORM\ManyToMany(targetEntity: Genre::class, inversedBy: 'movies')]
    #[ORM\JoinTable(name: 'movie_genre')]
    private Collection $genres;

    /** @var Collection<int, Casting> */
    #[ORM\OneToMany(mappedBy: 'movie', targetEntity: Casting::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $castings;

    public function __construct()
    {
        $this->id = Uuid::v4();
        $this->createdAt = new DateTimeImmutable();
        $this->genres = new ArrayCollection();
        $this->castings = new ArrayCollection();
    }

    public function getId(): Uuid
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getReleaseYear(): int
    {
        return $this->releaseYear;
    }

    public function setReleaseYear(int $releaseYear): self
    {
        $this->releaseYear = $releaseYear;

        return $this;
    }

    public function getDurationMinutes(): int
    {
        return $this->durationMinutes;
    }

    public function setDurationMinutes(int $durationMinutes): self
    {
        $this->durationMinutes = $durationMinutes;

        return $this;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    /** @return Collection<int, Genre> */
    public function getGenres(): Collection
    {
        return $this->genres;
    }

    public function addGenre(Genre $genre): self
    {
        if (!$this->genres->contains($genre)) {
            $this->genres->add($genre);
        }

        return $this;
    }

    public function removeGenre(Genre $genre): self
    {
        $this->genres->removeElement($genre);

        return $this;
    }

    /** @return Collection<int, Casting> */
    public function getCastings(): Collection
    {
        return $this->castings;
    }

    public function addCasting(Casting $casting): self
    {
        if (!$this->castings->contains($casting)) {
            $this->castings->add($casting);
            $casting->setMovie($this);
        }

        return $this;
    }

    public function removeCasting(Casting $casting): self
    {
        if ($this->castings->removeElement($casting) && $casting->getMovie() === $this) {
            $casting->setMovie(null);
        }

        return $this;
    }
}
