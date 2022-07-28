# Pravidla pro vytvareni Merge Requestu

- Pouzivejte `pre-commit` (viz [nize](#pre-commit))
- Piste srozumitelne git komentare (viz [How to Write a Git Commit Message](https://cbea.ms/git-commit/))
- Nepouzivejte zbytecne commity v jednom MR (viz [nize](#commity))
- Kdyz to jde - snazte se pokryt kod testy.
- Vsechny testy musi passnout a nekdo musi dat na MR approve (aby se mohl MR mergnout)

## Jak naklonovat repozitar a nastavit remotes

Vytvor si fork repozitare `git@gitlab.fi.muni.cz:xkyjovsk/pb138-project.git` a pak:

    $ git clone git@gitlab.fi.muni.cz:TVOJE_USERNAME/pb138-project.git
    $ cd pb138-project
    $ git remote add upstream git@gitlab.fi.muni.cz:xkyjovsk/pb138-project.git

Potom by mel byt vystup `git remote -v` takovyto:

    $ git remote -v

    $ origin  git@github.com:TVOJE_USERNAME/pb138-project.git (fetch)
    $ origin  git@github.com:TVOJE_USERNAME/pb138-project.git (push)
    $ upstream        git@github.com/xkyjovsk/pb138-project.git (fetch)
    $ upstream        git@github.com/xkyjovsk/pb138-project.git (push)

## Vytvoreni Merge Requestu

Vsechny kroky nize se deji ve vasem FORKnutem repozitari.

Nejdrive se prepneme do `main` branche.

    $ git switch main

Potom si k sobe na `main` branch `pull`neme vsechny zmeny z `upstream`u. Konkretne z `main` branche v `upstream`u.

    $ git pull upstream main

Prvni musime vytvorit branch na ktere budeme vyvijet novou feature.

    $ git switch -c my-new-feature

Po implementaci feature (git add, git commit) se poprve pushuje do forknuteho repozitare takto:

    $ git push -u origin my-new-feature

Pro dalsi pushe uz nebude nutne pouzivat prepinac `-u`.

Nyni se muzeme podivat na [upstream](https://gitlab.fi.muni.cz/xkyjovsk/pb138-project/-/merge_requests) a uvidime tlacitko create merge request.

### MR labels

V merge requestu si muzete vsimnout tri labels - `do-not-merge`, `ready-for-review` a `work-in-progress`.
`ready-for-review` label je znamka pro reviewery, ze uz je merge request hotovy a mohou se na nej podivat. Nazev zbytku labelu asi mluvi za sebe.

### pre-commit

Pouzivame [pre-commit](https://pre-commit.com/) (basically sbirka lintu). Mrknete se do [.pre-commit-config.yaml](.pre-commit-config.yaml) souboru.

Aby pre-commit fungoval, musite jej nejdrive [nainstalovat](https://pre-commit.com/#installation)

    $ pip3 install pre-commit

A pak v repozitari:

    $ pre-commit install

V pripade, ze budete chtit z nejakeho duvodu vytvorit commit bez vsech checkeru, muzete pouzit pri `git commit` moznost `-n/--no-verify`. Ale vezte, ze aby mohl byt MR mergnut, MUSI vsechny checkery projit.

V pripade, kdy chcete zkontrolovat vsechny soubory v repozitari pre-commitem jeste pred commitem - staci pouzit prikaz `pre-commit run --all-files`.

## Commity

Nekdy se proste stane, ze v kodu udelame nejakou jednoduchou chybu - napr. jsou nekde v kodu zbytecne redundantni zavorky... ale my uz mame nas kod commitnuty. Tohle muze svadet k vytvoreni noveho commitu s nejakym komentarem o odstraneni zavorek. Vystup git logu by mohl vypadat nejak takto:

    *   9826d9a (upstream/main) Merge pull request #XYZZ
    |\
    | * 8765432 Remove redundant parentheses on line 372
    | * 0987654 Add new command `clean` for cleaning the user's mess
    | * 67890ab Added functionality for finding the user's mess in the database.
    |/
    *   987ba65 Merge pull request #XYZ

Co je na tomhle spatne? Git commit s komentarem `Remove redundant parentheses on line 372` nas absolutne nezajima - nerika nam nic duleziteho, neobsahuje v sobe zadnou funkcionalitu - jen vnasi do historie gitu bordel - je tam zbytecne. To, co chceme udelat je [squashnout/fixupnout](https://www.mikulskibartosz.name/git-fixup-explained/) nase commity. Takze vlastne muzeme v podstate commit `Remove redundant parentheses on line 372` jakoby spojit s nejakym jinym v nasem MR a dostaneme takovou historii:

    *   9826d9a (upstream/main) Merge pull request #XYZZ
    |\
    | * 0987654 Add new command `clean` for cleaning the user's mess
    | * 67890ab Added functionality for finding the user's mess in the database.
    |/
    *   987ba65 Merge pull request #XYZ

Kde chyba se zavorkama byla opravena a spojena tam, kde byla vytvorena (treba v `` Add new command `clean` for cleaning the user's mess `` commitu).
