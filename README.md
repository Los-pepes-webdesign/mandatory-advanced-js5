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

**Documentation** can be found at [https://greensock.com/docs/] and a **tutorial** at [https://greensock.com/get-started/].


### Material Icons

This package provides a convenient react component for using Google's Material Icons in your react application.

#### Usage
 
```
import MaterialIcon, {add} from 'material-icons-react';

<MaterialIcon icon="add" color='#7bb92f' />
```

## Git Instructions

**Get Branch:** git pull origin branch_name

**Get Master:** git pull origin master

**Clone a project:** git clone githublink

**Merge branch into other branch:** git merge branch_name
- The `MERGE` command is executed from the branch you want to merge **INTO**
- Example: `git merge dev` merges the branch `dev` into the branch your are currently in.


**Create new branch:**
git branch branch_name

**Switch branch:**
git checkout branch_name

**Delete branch:**
git branch -d branch_name

**Show all branches:**
git branch


## Los Pepes Color Palette
**HEX:** `#581845` **SCSS:** `$purple`

**HEX:**`#900C3F` **SCSS:** `$wine`

**HEX:**`#C70039` **SCSS:** `$red`

**HEX:**`#FF5733` **SCSS:** `$orange`

**HEX:**`#FFC30F` **SCSS:** `$yellow`

We decided on this color palette because it is almost more Los Pepes than Los Pepes itself.


## Mandatory Advanced js 5
The description for the assignment is located in the create-react-app 

### Project description
https://github.com/Los-pepes-webdesign/mandatory-advanced-js5/blob/master/Avancerad%20JS%20-%20Grupp-projekt.pdf
