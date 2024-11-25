# Overview

The KU consists of 3 *sub-assignments* that build on one another and finally result in a small, but quite useful **Geographic Information System** that serves data over a *Representational state transfer (REST)* interface. During this course you will learn about *modern Java principles*, and use a wide variety of libraries that we have already included for you. (There is also a bonus assignment focusing on GPU rendering with the *Light-Weight Java Game Library (LWJGL)*, but more on that after the A0 deadline.)

This file will outline some important organizational information.

## Important

You will work alone for the scope of *Assignment A0* and only your work will be considered for the final grading of this subtask. *Assignment A1* as well as *Assignment A2* (and the *Bonus-Assignment*) will be carried out in groups, and you will be graded as a group (unless we notice that work was distributed unevenly among the team members).   
Your final grade will be based on the sum of A0, A1, A2 and the Bonus-Assignment.

This year we have a very streamlined workflow, so make sure to stick to the given dates listed below:

## Timeline

+ Assignment A0 
  + Release: 03-06.10.2024        
  + Deadline: 24.10.2024
  + Everyone with < 60% points will be de-registered from the KU
+ Group registration 
  + Start: 24.10.2024
  + End: 4.11.2024
  + Group registration is done through TeachCenter
+ Assignment A1 
  + Start: 4.11.2024
  + Soft-Deadline: 19.12.2024
    + Tests for Tasks of A1 will not be continued after Soft-Deadline
+ Assignment A2: 
  + Start: 19.12.2024
  + Deadline 16.01.2025 (A1 + A2)
  + *Assignment interviews (AG)*: In the week(s) after the A2 deadline

We will grade the most recent commit on your `main` branch before the deadline (midnight/23:59 at their respective dates), so there is no need for a tag/special branch! **Make sure that you commit to the main branch! There is no late submission or second chance submission!**

## Requirements

+ You are allowed to work in groups of up to **3** students after you passed A0. You should share the workload evenly across every student, and in the end every student is required to know everything about the entire submission.
+ Plagiarism will not be tolerated
+ Every student has to push to the git repository, working from one computer only is not in the spirit of the course.

## Team Registration

By the time A0 is handed in, you should have already formed teams of up to 3 students. Use TeachCenter to create your group. The teams stay the same throughout the course. Please tell us when a teammate drops out during the semester. Note that a grade is issued as soon as you register for a group on TC. Please make sure that you work in groups of 3. Only in exceptions it is allowed to work on the group assignments alone or in a group of 2.


## Getting started

### System Requirements

You should have the following programs/tools installed on your machine (and set up properly using the `$PATH` and `$JAVA_HOME` environment variables):

+ Git
+ Java 17
+ Maven
+ A Java IDE such as IntelliJ, VSCode or Eclipse
+ Recommended: Request inspector such as Insomnia, PostMan, ...

### Checking out the Framework

You should have been granted access to a git repository designated to your team. All your progress/commits must be documented in this repository, so you aren't allowed to use any other versioning system or another Git service. Our GitLab instance can be found at https://student.cgv.tugraz.at/. To sign in, click "Sign in with TUGRAZ online (Students)". Use SSH for authenticating yourself in Git. You'll need to
generate an SSH keypair (if you haven't already) and add it to
your GitLab Profile.

Open a shell on your machine and issue the following commands:

```sh
# Clone your team repository, NOT the framework.
# XXX is your repository name (A0_XXXXXXXX)
git clone git@student.cgv.tugraz.at:OOP2.2024/a0/XXX.git
cd XXX

# Set your Git credentials. Use "--global" instead of "--local" if you
# use Git exclusively at TUGraz.
git config --local user.name "Max Muster"
git config --local user.email "max.muster@student.tugraz.at"

# Add framework as second remote repository.
git remote add framework git@student.cgv.tugraz.at:OOP2.2024/framework.git
git pull framework

# Only one member of your group has to merge/push the framework to your own repository (A1+A2).
git merge framework/main
git push origin main
```

If everything has worked so far, you should see the contents of the framework in your team repository in GitLab.

To pull changes from the framework, issue the command `git pull framework`. Changes to the framework will be announced on [TeachCenter Announcements](https://tc.tugraz.at/main/mod/forum/view.php?id=52959) as well as on [Discord](https://discord.gg/SXdy6cafzu).  

### Setting up your IDE

Which IDE you use, depends on your preferences. Here we describe how the framework can be used using IntelliJ.

The framework is using Project Lombok to generate getters and setters for data classes. It will work without any additional setup on your side, but IntelliJ will show errors (which can be ignored) if you don't install the `Lombok` plugin.  
For a quick overview of what Lombok does check out [this documentation](https://projectlombok.org/)

You should be able to configure the project within IntelliJ if you open the `pom.xml` within the root of your checked out repository as a project. Following two configurations should be created to run the backend and middleware later on:

![Middleware_config](samples/middleware_config.png)

![Backend_config](samples/backend_config.png)

### Working with gRPC

gRPC is an open-source remote procedure call (RPC) framework developed by Google. It enables communication between services running on different machines, allowing them to interact as if they were local. It uses Protocol Buffers (protobuf) as the interface definition language for defining service methods and message types, making it efficient and language-agnostic. gRPC is often used in microservices architectures for its performance and scalability.

If you have problems setting up the project with an older version of IntelliJ with imports from `import at.tugraz.oop2.data.*;` (or whatever package you use for your generated gRPC classes):

Consider updating to 2023 or 2024 version or, go to the right of your IDE to Maven:

+ jmap compile and jmap install
+ Plugins -> protobuf -> protobuf:compile

On the left under project structure: Go to `target` -> `protobuf` and right-click on `grpc-java` and `java` and select -> Mark directory as ... -> Generated Sources Root

### Getting the dataset

You can either download the dataset [here](https://tc.tugraz.at/main/course/view.php?id=1947) as mentioned above or generate it yourself (not recommended, only here for transparency reasons) by downloading `steiermark-latest.osm.pbf` from [Open Steetmap Austria Dataset](https://download.openstreetmap.fr/extracts/europe/austria/) and using these commands (given that you have these tools installed):

```sh
osmconvert steiermark-latest.osm.pbf -b=15.288,46.9750,15.6674,47.1211  --complete-ways --complete-multipolygons --complete-boundaries >styria.osm
osmfilter styria.osm --keep="highway= landuse= amenity= water=" --drop="@id=1278240 @id=1806180 @id=11167526 type=route type=site highway=footway" --drop-author --drop-version -o=styria_reduced.osm
```

If you find yourself struggling to load the provided dataset, please reach out to us to get tips or a reduced dataset if your machine is not able to handle the load. The data is provided by OpenStreetMap contributers and they hold the copyright on that dataset.

### Starting using Docker

Docker is a platform that enables developers to automate the deployment, scaling, and management of applications using containerization. Containers are lightweight, standalone units that package an application and its dependencies, ensuring it runs consistently across different environments. Docker simplifies the development process by allowing applications to run reliably on any system, from a developer’s laptop to production servers, without compatibility issues.

We provide you with an optional Docker system that allows you to make sure that your submission runs well on our testing system.

First, make sure that you have both `docker` and `docker-compose` installed (if you are on Windows, we recommend using WSL2). Afterwards, simply execute the following in your repository root:

```sh
./docker/build_docker.sh && docker-compose up -d
```

This should start and run your code in a docker container, including the frontend. You can also omit the `-d` flag to stay attached to all containers and stop them with `CTRL+C`. If you want to stop the containers use:

```sh
docker-compose down
```

### REST-Testing

It is highly recommended that you test your submission not only using the provided frontend, but also inspecting your requests manually.

We recommend the tools [Insomnia](https://github.com/Kong/insomnia) and [Postman](https://www.postman.com/), which are open-source tools to inspect and test REST-based systems. You should be fine by simply creating a few requests, but you can also create a testing framework in there yourself if you are inclined to do so!

## Framework

### Maven

Maven is a build automation and project management tool primarily used for Java projects. It simplifies the process of building, managing dependencies, and packaging projects by using a standardized project structure and configuration file (pom.xml). With Maven, you can easily manage project dependencies, compile code, run tests, and create distributable packages, making it a key tool for consistent and reproducible builds in Java development.

We provide you with the properly set up Maven dependencies and projects, through which all necessary plugins and build routines should be covered.

Read up on Maven here: [Maven](https://www.tutorialspoint.com/maven/index.htm)

### Logger

We have prepared a `MapLogger`\-class with all-static methods in the `shared`\-subproject. You are required to call the functions with the specified parameters, as you might not receive all points otherwise! Please consult us if you are not sure when/how to call these functions.

### Frontend

While you can (and should!) test your responses using some REST-testing utility as outlined above, we provide you with a small frontend that should allow you to quickly check your responses and whether they make sense or work at all. You can start it easily using Docker Compose as described above.

## Grading

You can achieve a total of 115 points (100 from the main assignment + 10 from the bonus task + up to 5 points from the course evaluation). To get a grade, you have to get at least 60% of the A0 points (you can leave the course at any time during A0!). 

Assignment A0 is worth 30 points, A1 36 points, A2 34 points and the bonus task can get you up to 10 points. You will work alone for the scope of Assignment A0. Assignment A1 as well as Assignment A2 (and the Bonus-Assignment) will be carried out in groups.

You will be graded the following way:

```Java
public static Grade getGrade(float ass0, float ass1, float ass2, float bonus) {

  if (ass0 < 18) {
      System.exit(0); // Drop out of the course without getting a grade - You do not lose an attempt
  }

  float total = ass0 + ass1 + ass2 + bonus;

  if (total >= 55) {
    if (total >= 91) {
      return Grade.SEHR_GUT;     // 1
    }
    if (total >= 79) {
      return Grade.GUT;          // 2
    }
    if (total >= 67) {
      return Grade.BEFRIEDIGEND; // 3
    }
    return Grade.GENUEGEND;      // 4
  }
  return Grade.NICHT_GENUEGEND;  // 5
}
```

## Links to the Assignment Descriptions

+ [A0](A0.md)
+ [A1](A1.md)