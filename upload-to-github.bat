@echo off
set "PATH=C:\Users\Dell\.local\git\cmd;C:\Users\Dell\.local\gcm;%PATH%"
cd /d "c:\Users\Dell\Downloads\lovable-project-"
echo =========================================================
echo  Uploading all project files to GitHub repository...
echo  Repository: https://github.com/khushvirkaur/ice-cream-parlour
echo =========================================================
echo.
git push -u origin main
echo.
echo =========================================================
if %ERRORLEVEL% EQU 0 (
    echo  [SUCCESS] All files uploaded successfully to GitHub!
) else (
    echo  [INFO] If a browser window opened, please sign in to complete authorization.
)
echo =========================================================
pause
