# University Hospital
## Table for classes
Name    | Constructor Parms | Notes
--------|-------------------|-------
Employee| name, id, salary? | Abstract/Origin class
Doctor  | name, id, salary? | Extends Employee
Surgeon | name, id, salary? | Extends Employee
Nurse   | name, id, salary? | Extends Employee
Bluecollar | name, id, salary? | Abstract, Extends Employee
Receptionist | name, id, salary? | Extends Bluecollar
Janitor | name, id          | Extends Bluecollar
Vampire Janitor | name, id  | is Janitor, but kind of evil
Patient | name, id | Origin

## _Note_: Further info for above classes can be found in README.md in src/

### Developer Notes for git
> *Order of git commits/merging (path-to-master)* <br>
> _*feature_branch (push)*_ --\> dev (pull-request) --\> master (pull-request)

### Shell script to create new feature branch and push to remote (from blank local directory)
```sh
# Usage:
/bin/bash this_script_name.sh [feature_name]
```
```bash
#!/bin/bash
# Helpful bash to create new feature_branch and push to remote
# Param - feature_branch_name ( name of feature_branch for <git_branch_arg>_branch
#         defaults to '$USER' of user executing script
#
# Global vars
REPO_NAME="high-street-hospital-jalil-brad"
BASENAME=$(echo -n $(basename "$PWD"))
GIT_URL="https://github.com/WeCanCodeIT/high-street-hospital-jalil-brad"

# Check if exists
if [ "$BASENAME" = "$REPO_NAME" || -d "$REPO_NAME" ]; then
    echo "Looks like $REPO_NAME already exists\n\n"
    exit 8
fi

# Do the thing
feature_branch_name=$0
if [ -z "$feature_branch_name" ]; then
    git_branch_name="$USER"_branch
else
    git_branch_name="$feature_branch_name"_branch
fi
git clone "$GIT_URL" && \
git branch "$git_branch_name" && \
git checkout "$git_branch_name" && \
git push --set-upstream origin "$git_branch_name"
exit
```

