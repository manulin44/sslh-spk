rm -Rf tmp
mkdir tmp
cd spk/target
tar -cvzf ../../tmp/package.tgz *
cd ..
cp -R scripts ../tmp/
cp INFO ../tmp
cd ../tmp
tar -cvf ../SSLH-1.9-1.spk *
