## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Opens [http://localhost:3000] to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm install`

Installs all dependencies required to run the app.



## Standards

### BEM modified for SCSS

We apply the use of BEM modified for SCSS when writing stylesheet. Example:

```
.class {
  &__nested {
    &__deep {
      width: 100%;
      height: 100%;
      
      &--modifier {
        background-color: green;
      }
    }
  }
}
```

For further reading, check [https://www.joeforshaw.com/blog/writing-scss-with-bem] or [http://getbem.com/introduction/] for documentation.



## Libraries

### Animations with GreenSock (GSAP)

Please use GSAP along with useEffect and useRef hooks for all your animation needs. Example running animation when component mounts:

```
const DOMElementRef = useRef(null);

useEffect(function() {
  gsap.from(DOMElementRef.current, {
    duration: '1s',
    y: '-50px',
    opacity: '0'
  }
}, []);

return (
  <DOMElement ref={DOMElementRef} />
)
```

## Git Instructions

Get Branch: git pull origin <branchname>
Get Master: git pull origin master

git clone githublink

Merge branch into other branch:
Go into the branch you want to merge INTO.
git merge <branch_name>

Create new branch:
git branch <name>

Switch branch:
git checkout <branch_name>

Delete branch:
git branch -d <name>

Show all branches:
git branch

**Documentation** can be found at [https://greensock.com/docs/] and a **tutorial** at [https://greensock.com/get-started/].
