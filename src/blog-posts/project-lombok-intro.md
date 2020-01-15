---
title: 'An Introduction to Project Lombok'
date: '2019-12-09'
tags: ['Java', 'Lombok']
---

Every single person who worked on Java would have created an Object at some point. Well, what is an Object? 

Its nothing but a real-life entity expressed programmatically. So, while creating an object, you might have created the getters and setters for every single variable in your class object.

Here, we have a simple class that represents a **Car**.

```java
class Car {
    private String carName;
    private int carPrice;
    private String colour;
}
```

If you're using an IDE like Eclipse or IntelliJ, you might have noticed that they provide an option to generate the getters and setters for your class variables. So, after generating the getters and setters, your class will look like this.

```java
class Car {
    private String carName;
    private int carPrice;
    private String colour;

    public setCarName(String carName) {
        this.carName = carName;
    }

    public setCarPrice(int carPrice) {
        this.carPrice = carPrice;
    }

    public setColor(String color) {
        this.color = color;
    }

    public String getCarName() {
        return this.carName;
    }

    public int getCarPrice() {
        return this.carPrice;
    }

    public String getColor() {
        return this.color;
    }
}
```

Notice that for a simple class with just three variables, generating the getters and setters made the class *so long*. Imagine generating getters and setters for a class with more than ten variables. 

<center>
    <img align="center" src="https://media.giphy.com/media/5z23XMH5WREPpkBl2u/giphy.gif">
</center>

Wouldn't it be great if we can get rid of these boilerplate getters and setters in our class, but can still use those methods? Can we avoid writing several lines of code?
Well, **[Project Lombok](https://projectlombok.org/)** is here to help you.

---

###Project Lombok
Project Lombok is a java library that automatically plugs into your editor and build tools and helps reduce the boilerplate code.

It uses *annotations* that can be used within our code and it is processed during compile time. The code expansion will take place in runtime based on the annotation used. 

This helps in code reduction and helps us in writing clean, easily maintainable code. 

---

###Lombok Annotations

* ####Getters and Setters
We can use these annotations either at class level or at the field level.

    When it is set at *class level* getters and setters are created for all fields.

    ```java
    @Getter
    @Setter
    class Car {
        private String carName;
        private int carPrice;
        private String colour;
    }
    ```

    When used at the field level, the getters and setters are created only for those particular fields.

    ```java
    class Car {

        @Getter
        private String carName;

        private int carPrice;

        @Setter
        private String colour;
    }
    ```
    In the above example, the getter method is generated only for the *carName* field and the setter method is generated only for the *color* field.

* ####Constructors

    Lombok also helps in generating the constructors for our classes.

    ```java
    @AllArgsConstructor
    class Car {
        private String carName;
        private int carPrice;
        private String colour;
    }
    ```

    The above code generates a constructor which has all the fields in the parameters.

    ```java
    class Car {
        private String carName;
        private int carPrice;
        private String colour;

        public Car(String carName, int carPrice, String color) {
            this.carName = carName;
            this.carPrice = carPrice;
            this.color = color;
        }
    }
    ```

    There is also a *@NoArgsConstructor* which generates a constructor without any parameters.

* #### Builder pattern

    The annotation *@Builder* lets you generate a code that makes your class instantiable using **Builder pattern**

    ```java

    @Builder
    public class Car {
        private String carName;
        private int carPrice;
        private String colour;

        public static void main(String[] args) {
            Car newCar = new CarBuilder()
                            .setCarName("BMW")
                            .setCarPrice(30000)
                            .setColor("Blue")
                            .build();
        }
    }
    ```

* #### Other annotations

    - *@EqualsAndHashCode* lets you override the equals() and hashCode() methods of your class.
    - *@ToString* lets you generate a toString() implementation.
    - *@Data* lets you have all commonly used annotations like @ToString, @EqualsAndHashCode, @Getter and @Setter for all fields.
    - *@NonNull* lets you generate a null-check statement for your fields.

<center>
    <img align="center" src="https://media.giphy.com/media/zcCGBRQshGdt6/giphy.gif">
</center>
---

###How can I Install It?

Adding Lombok to your project is easy. You can just add the below dependency in your *pom.xml* file. Of course, you need a **Maven** project for that.

```xml
<dependency>
	<groupId>org.projectlombok</groupId>
	<artifactId>lombok</artifactId>
</dependency>
```

For projects built with **Gradle**, someone has created a nice [plugin](https://github.com/franzbecker/gradle-lombok) for that.

They are also providing the **IntelliJ** plugin to use Lombok in your project. Visit [here](https://projectlombok.org/setup/intellij) to install.

If you are using **Eclipse** IDE, you need to download the Lombok Jar. The latest version is available [here](https://search.maven.org/search?q=g:org.projectlombok%20AND%20a:lombok&core=gav).








